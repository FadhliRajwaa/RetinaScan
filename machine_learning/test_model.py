import os
import tensorflow as tf
from tensorflow.keras.models import load_model
import logging
import sys

# Konfigurasi logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Kurangi log TensorFlow
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # 0=DEBUG, 1=INFO, 2=WARNING, 3=ERROR
logging.getLogger('tensorflow').setLevel(logging.ERROR)

def test_load_model():
    """
    Menguji apakah model dapat dimuat dengan benar
    """
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
                        model = load_model(model_path, compile=False)
                    logger.info("Model loaded with compile=False")
                    logger.info(f"Model type: {type(model).__name__}")
                    logger.info(f"Model summary: {model.summary()}")
                    return True
                except Exception as e1:
                    logger.error(f"Error loading with compile=False: {str(e1)}")
                    # Fallback ke loading normal
                    with tf.device('/CPU:0'):
                        model = load_model(model_path)
                    logger.info("Model loaded with default options")
                    logger.info(f"Model type: {type(model).__name__}")
                    logger.info(f"Model summary: {model.summary()}")
                    return True
            else:
                logger.warning(f"Model file not found at {model_path}")
        except Exception as e:
            logger.error(f"Error loading model from {model_path}: {str(e)}")
    
    logger.error("All model loading attempts failed")
    return False

if __name__ == "__main__":
    success = test_load_model()
    if success:
        logger.info("Model test successful!")
        sys.exit(0)
    else:
        logger.error("Model test failed!")
        sys.exit(1) 