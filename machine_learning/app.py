from fastapi import FastAPI, File, UploadFile, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import datetime
import sys
import traceback
import io
import gc
import logging
from PIL import Image
from typing import Dict, Any
import base64

# Konfigurasi logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Kurangi log TensorFlow
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # 0=DEBUG, 1=INFO, 2=WARNING, 3=ERROR
logging.getLogger('tensorflow').setLevel(logging.ERROR)

# Konfigurasi TensorFlow untuk CPU
physical_devices = tf.config.list_physical_devices('CPU')
try:
    # Batasi penggunaan memori TensorFlow
    for device in physical_devices:
        tf.config.experimental.set_memory_growth(device, True)
except:
    logger.info("Tidak dapat mengatur memory growth, menggunakan metode alternatif")

app = FastAPI(title="Retinopathy Detection API")

# Konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Konfigurasi model dan status
MODEL_LOADED = False
MODEL = None
ERROR_MESSAGE = None
STARTUP_TIME = datetime.datetime.now()

# Retinopathy class names
# URUTAN LAMA: ['No DR', 'Mild', 'Moderate', 'Severe', 'Proliferative DR']
# URUTAN BARU berdasarkan analisis model
CLASS_NAMES = ['Mild', 'Moderate', 'No DR', 'Proliferative DR', 'Severe']

# Load Retinopathy model
def load_ml_model():
    global MODEL, MODEL_LOADED, ERROR_MESSAGE
    
    # Coba beberapa path yang mungkin untuk model
    possible_paths = [
        os.path.join(os.path.dirname(os.path.abspath(__file__)), 'model-Retinopaty-Diabetic.h5'),
        './model-Retinopaty-Diabetic.h5',
        '/app/model-Retinopaty-Diabetic.h5',
        os.path.join(os.getcwd(), 'model-Retinopaty-Diabetic.h5')
    ]
    
    # Jika environment variable MODEL_PATH diatur, tambahkan ke daftar
    if os.environ.get('MODEL_PATH'):
        possible_paths.insert(0, os.environ.get('MODEL_PATH'))
    
    for model_path in possible_paths:
        try:
            logger.info(f"Trying to load model from: {model_path}")
            if os.path.exists(model_path):
                logger.info(f"Model file found at {model_path}, loading...")
                
                # Gunakan opsi lebih efisien untuk memuat model
                try:
                    # Coba dengan compile=False untuk mempercepat loading
                    with tf.device('/CPU:0'):
                        MODEL = load_model(model_path, compile=False)
                    logger.info("Model loaded with compile=False")
                except Exception as e1:
                    logger.error(f"Error loading with compile=False: {str(e1)}")
                    # Fallback ke loading normal
                    with tf.device('/CPU:0'):
                        MODEL = load_model(model_path)
                    logger.info("Model loaded with default options")
                
                MODEL_LOADED = True
                logger.info("Model loaded successfully!")
                return
            else:
                logger.warning(f"Model file not found at {model_path}")
        except Exception as e:
            logger.error(f"Error loading model from {model_path}: {str(e)}")
            traceback.print_exc(file=sys.stdout)
    
    # Jika semua path gagal, catat error
    logger.error("All model loading attempts failed")
    ERROR_MESSAGE = "Model could not be loaded"
    MODEL_LOADED = False

# Panggil fungsi load model
try:
    # Coba load model dengan penanganan error yang lebih baik
    load_ml_model()
    # Segera jalankan garbage collection untuk membebaskan memori
    gc.collect()
except Exception as e:
    logger.error(f"Critical error in load_ml_model: {str(e)}")
    traceback.print_exc(file=sys.stdout)
    ERROR_MESSAGE = f"Critical error loading model: {str(e)}"

def prepare_image(img, target_size=(224, 224)):
    """
    Mempersiapkan gambar untuk prediksi
    """
    # Pastikan gambar dalam mode RGB
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Resize gambar
    img = img.resize(target_size)
    
    # Konversi ke array
    img_array = image.img_to_array(img)
    
    # Expand dimensions
    img_array = np.expand_dims(img_array, axis=0)
    
    # Normalisasi
    img_array = img_array / 255.0
    
    return img_array

@app.get("/")
def health_check() -> Dict[str, Any]:
    """
    Endpoint health check utama dengan informasi detail tentang API
    """
    try:
        memory_info = {}
        try:
            import psutil
            process = psutil.Process(os.getpid())
            memory_info = {
                'rss_mb': process.memory_info().rss / 1024 / 1024,
                'vms_mb': process.memory_info().vms / 1024 / 1024
            }
        except ImportError:
            memory_info = {'status': 'psutil not available'}
        
        uptime = datetime.datetime.now() - STARTUP_TIME
        
        return {
            'status': 'Online Bro',
            'service': 'retinopathy-api',
            'model_name': 'Retinopathy Detection Model',
            'model_loaded': MODEL_LOADED,
            'error_message': ERROR_MESSAGE,
            'classes': CLASS_NAMES,
            'api_version': '1.0.0',
            'tf_version': tf.__version__,
            'memory_usage': memory_info,
            'uptime_seconds': uptime.total_seconds(),
            'uptime_formatted': f"{uptime.days}d {uptime.seconds//3600}h {(uptime.seconds//60)%60}m {uptime.seconds%60}s",
            'timestamp': datetime.datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error in health check: {str(e)}")
        return {
            'status': 'error',
            'error': str(e),
            'service': 'retinopathy-api'
        }

@app.post("/predict")
async def predict(file: UploadFile = File(...)) -> Dict[str, Any]:
    """
    Endpoint untuk memprediksi retinopati dari gambar yang diunggah
    """
    start_time = datetime.datetime.now()
    
    if not MODEL_LOADED:
        raise HTTPException(status_code=500, detail="Model not loaded properly")
    
    try:
        # Baca file gambar
        contents = await file.read()
        img_io = io.BytesIO(contents)
        
        # Load dan persiapkan gambar
        img = Image.open(img_io)
        img_array = prepare_image(img)
        
        # Prediksi dengan model
        with tf.device('/CPU:0'):
            preds = MODEL.predict(img_array, verbose=0)
        class_idx = np.argmax(preds[0])
        class_name = CLASS_NAMES[class_idx]
        confidence = float(np.max(preds[0]))
        
        # Bersihkan memori
        del img_array
        del preds
        gc.collect()
        
        processing_time = (datetime.datetime.now() - start_time).total_seconds() * 1000
        
        return {
            'class': class_name, 
            'confidence': confidence,
            'processing_time_ms': processing_time
        }
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        traceback.print_exc(file=sys.stdout)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict-base64")
async def predict_base64(data: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """
    Endpoint untuk memprediksi retinopati dari gambar base64
    """
    start_time = datetime.datetime.now()
    
    if not MODEL_LOADED:
        raise HTTPException(status_code=500, detail="Model not loaded properly")
    
    try:
        # Validasi input
        if 'image_data' not in data:
            raise HTTPException(status_code=422, detail="Field 'image_data' is required")
        
        base64_data = data['image_data']
        
        # Validasi format base64
        try:
            # Decode base64 data
            image_bytes = base64.b64decode(base64_data)
            img_io = io.BytesIO(image_bytes)
        except Exception as e:
            logger.error(f"Invalid base64 data: {str(e)}")
            raise HTTPException(status_code=422, detail=f"Invalid base64 data: {str(e)}")
        
        # Load dan persiapkan gambar
        try:
            img = Image.open(img_io)
            img_array = prepare_image(img)
        except Exception as e:
            logger.error(f"Error processing image: {str(e)}")
            raise HTTPException(status_code=422, detail=f"Error processing image: {str(e)}")
        
        # Prediksi dengan model
        with tf.device('/CPU:0'):
            preds = MODEL.predict(img_array, verbose=0)
        class_idx = np.argmax(preds[0])
        class_name = CLASS_NAMES[class_idx]
        confidence = float(np.max(preds[0]))
        
        # Bersihkan memori
        del img_array
        del preds
        gc.collect()
        
        processing_time = (datetime.datetime.now() - start_time).total_seconds() * 1000
        
        return {
            'class': class_name, 
            'confidence': confidence,
            'processing_time_ms': processing_time,
            'is_simulation': False
        }
    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        logger.error(f"Error during prediction with base64: {str(e)}")
        traceback.print_exc(file=sys.stdout)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/test-model")
def test_model() -> Dict[str, Any]:
    """
    Endpoint untuk menguji apakah model berhasil dimuat
    """
    if MODEL_LOADED:
        return {
            'status': 'success',
            'message': 'Model loaded successfully',
            'model_type': str(type(MODEL).__name__)
        }
    else:
        raise HTTPException(
            status_code=500, 
            detail=ERROR_MESSAGE or 'Model failed to load'
        )
