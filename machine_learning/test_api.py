import requests
import os
import logging
import json

# Konfigurasi logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# URL API
API_URL = "http://localhost:8000"

def test_health_check():
    """
    Menguji endpoint health check
    """
    response = requests.get(f"{API_URL}/")
    logger.info(f"Health check status code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        logger.info(f"API Status: {data.get('status')}")
        logger.info(f"Model loaded: {data.get('model_loaded')}")
        logger.info(f"Classes: {data.get('classes')}")
        return True
    else:
        logger.error(f"Health check failed: {response.text}")
        return False

def test_predict_endpoint():
    """
    Menguji endpoint predict dengan gambar sampel
    """
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
    
    # Hasil pengujian
    results = {}
    
    # Uji setiap gambar
    for label, img_path in sample_images.items():
        full_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), img_path)
        
        if not os.path.exists(full_path):
            logger.error(f"Image file not found: {full_path}")
            continue
        
        # Kirim request ke API
        with open(full_path, 'rb') as img_file:
            files = {'file': (os.path.basename(full_path), img_file, 'image/png')}
            response = requests.post(f"{API_URL}/predict", files=files)
        
        # Proses hasil
        if response.status_code == 200:
            data = response.json()
            predicted_class = data.get('class')
            confidence = data.get('confidence')
            processing_time = data.get('processing_time_ms')
            
            # Simpan hasil
            results[label] = {
                'predicted_class': predicted_class,
                'confidence': confidence,
                'processing_time_ms': processing_time
            }
            
            # Tampilkan hasil
            logger.info(f"Gambar: {label}")
            logger.info(f"Prediksi: {predicted_class}")
            logger.info(f"Confidence: {confidence:.4f}")
            logger.info(f"Processing time: {processing_time:.2f} ms")
            logger.info("-" * 50)
        else:
            logger.error(f"Prediction failed for {label}: {response.text}")
    
    # Periksa hasil
    if results:
        logger.info("\nRINGKASAN HASIL API:")
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
        logger.info(f"Akurasi API: {correct_count}/{total_count} ({accuracy:.2f}%)")
        logger.info("=" * 50)
    
    return results

if __name__ == "__main__":
    logger.info("Menguji API RetinaScan...")
    
    # Uji health check
    if test_health_check():
        logger.info("Health check berhasil, menguji endpoint predict...")
        
        # Uji endpoint predict
        test_predict_endpoint()
    else:
        logger.error("Health check gagal, tidak dapat melanjutkan pengujian.") 