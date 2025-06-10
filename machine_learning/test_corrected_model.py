import os
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import logging

# Konfigurasi logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Kurangi log TensorFlow
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
logging.getLogger('tensorflow').setLevel(logging.ERROR)

# Urutan kelas yang dikoreksi berdasarkan analisis
CORRECTED_CLASS_NAMES = ['Mild', 'Moderate', 'No DR', 'Proliferative DR', 'Severe']

def prepare_image(img_path, target_size=(224, 224)):
    """
    Mempersiapkan gambar untuk prediksi
    """
    # Load gambar
    img = Image.open(img_path)
    
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

def load_model_file():
    """
    Memuat model dari file
    """
    model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'model-Retinopaty-Diabetic.h5')
    
    if os.path.exists(model_path):
        logger.info(f"Model file found at {model_path}, loading...")
        with tf.device('/CPU:0'):
            model = load_model(model_path, compile=False)
        logger.info("Model loaded successfully")
        return model
    else:
        logger.error(f"Model file not found at {model_path}")
        return None

def test_sample_images():
    """
    Menguji model dengan gambar sampel menggunakan urutan kelas yang dikoreksi
    """
    # Load model
    model = load_model_file()
    if model is None:
        logger.error("Failed to load model")
        return
    
    # Daftar gambar sampel
    sample_images = {
        'Normal': 'sample_images/mata-normal.png',
        'Ringan': 'sample_images/mata-ringan.png',
        'Sedang': 'sample_images/mata-sedang.png',
        'Parah': 'sample_images/mata-parah.png',
        'Sangat Parah': 'sample_images/mata-sangat-parah.png'
    }
    
    # Mapping yang diharapkan
    expected_mapping = {
        'Normal': 'No DR',
        'Ringan': 'Mild',
        'Sedang': 'Moderate',
        'Parah': 'Severe',
        'Sangat Parah': 'Proliferative DR'
    }
    
    # Prediksi setiap gambar
    results = {}
    for label, img_path in sample_images.items():
        full_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), img_path)
        
        if not os.path.exists(full_path):
            logger.error(f"Image file not found: {full_path}")
            continue
            
        # Prepare image
        img_array = prepare_image(full_path)
        
        # Prediksi
        with tf.device('/CPU:0'):
            preds = model.predict(img_array, verbose=0)
        
        # Dapatkan hasil dengan urutan kelas yang dikoreksi
        class_idx = np.argmax(preds[0])
        class_name = CORRECTED_CLASS_NAMES[class_idx]
        confidence = float(np.max(preds[0]))
        
        # Simpan hasil
        results[label] = {
            'predicted_class': class_name,
            'confidence': confidence,
            'raw_predictions': preds[0].tolist()
        }
        
        # Tampilkan hasil
        logger.info(f"Gambar: {label}")
        logger.info(f"Prediksi: {class_name}")
        logger.info(f"Confidence: {confidence:.4f}")
        logger.info(f"Raw predictions: {preds[0]}")
        logger.info("-" * 50)
    
    return results, expected_mapping

if __name__ == "__main__":
    logger.info("Mulai pengujian gambar sampel dengan urutan kelas yang dikoreksi...")
    results, expected_mapping = test_sample_images()
    
    # Periksa hasil
    if results:
        logger.info("\nRINGKASAN HASIL:")
        logger.info("=" * 50)
        correct_count = 0
        total_count = len(results)
        
        for label, result in results.items():
            predicted = result['predicted_class']
            expected = expected_mapping[label]
            match = "✓" if predicted == expected else "✗"
            
            if predicted == expected:
                correct_count += 1
                
            logger.info(f"{label:12} -> Prediksi: {predicted:15} | Diharapkan: {expected:15} | {match}")
        
        accuracy = (correct_count / total_count) * 100 if total_count > 0 else 0
        logger.info("=" * 50)
        logger.info(f"Akurasi: {correct_count}/{total_count} ({accuracy:.2f}%)")
        logger.info("=" * 50) 