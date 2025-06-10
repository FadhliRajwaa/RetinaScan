---
title: Retinascan API
emoji: 🔥
colorFrom: gray
colorTo: red
sdk: docker
pinned: false
license: mit
---

# 🧠 RetinaScan API (Flask)

<div align="center">
  
  ![RetinaScan API](https://img.shields.io/badge/RetinaScan-Flask_API-orange?style=for-the-badge)
  
  [![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
  [![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
  [![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)
  
  API Flask untuk analisis gambar retina menggunakan model machine learning.
</div>

## 📋 Daftar Isi
- [Pengenalan](#-pengenalan)
- [Fitur](#-fitur)
- [Teknologi](#-teknologi)
- [Memulai](#-memulai)
- [Struktur Proyek](#-struktur-proyek)
- [API Endpoints](#-api-endpoints)
- [Model Machine Learning](#-model-machine-learning)
- [Deployment](#-deployment)
- [Mode Simulasi](#-mode-simulasi)
- [Troubleshooting](#-troubleshooting)

## 🔍 Pengenalan

RetinaScan API adalah layanan Flask yang menggunakan model machine learning untuk menganalisis gambar retina dan mendeteksi tingkat keparahan retinopati diabetik. API ini dirancang untuk bekerja dengan backend Node.js RetinaScan, tetapi juga dapat digunakan sebagai layanan mandiri.

## ✨ Fitur

- **Analisis Gambar Retina** - Mendeteksi tingkat keparahan retinopati diabetik dari gambar retina
- **Preprocessing Gambar** - Melakukan preprocessing pada gambar sebelum analisis
- **Prediksi Multiclass** - Mengklasifikasikan gambar ke dalam 5 tingkat keparahan (0-4)
- **API RESTful** - Endpoint API yang mudah digunakan
- **Mode Simulasi** - Opsi untuk menjalankan API dalam mode simulasi tanpa model ML
- **Validasi Gambar** - Memastikan gambar yang diunggah valid dan sesuai format
- **Logging** - Sistem logging untuk memantau aktivitas dan error

## 🛠 Teknologi

- **Python** - Bahasa pemrograman utama
- **Flask** - Framework web untuk Python
- **TensorFlow/Keras** - Library untuk model machine learning
- **OpenCV** - Library untuk pengolahan gambar
- **NumPy** - Library untuk komputasi numerik
- **Pillow** - Library untuk manipulasi gambar
- **Gunicorn** - WSGI HTTP Server untuk deployment

## 🚀 Memulai

### Persyaratan

- Python 3.8+
- pip
- virtualenv (opsional, tetapi direkomendasikan)

### Instalasi

1. Clone repository:
   ```bash
   git clone https://github.com/username/RetinaScan.git
   cd RetinaScan/backend/retinascan-api
   ```

2. Buat dan aktifkan virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Di Linux/Mac
   venv\Scripts\activate     # Di Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Jalankan server:
   ```bash
   python app.py
   ```

5. Server akan berjalan di http://localhost:5001

## 📂 Struktur Proyek

```
retinascan-api/
├── app.py                     # Entry point aplikasi Flask
├── model-Retinopaty-Diabetic.h5 # Model machine learning
├── requirements.txt           # Dependencies Python
├── Dockerfile                 # Konfigurasi Docker
├── test_api.py                # Script pengujian API
├── test_model.py              # Script pengujian model
├── test_corrected_model.py    # Script pengujian model yang dikoreksi
├── fix_class_order.py         # Script untuk memperbaiki urutan kelas
├── test_images.py             # Script pengujian dengan gambar
├── sample_images/             # Gambar sampel untuk pengujian
│   ├── normal.jpg
│   ├── mild.jpg
│   ├── moderate.jpg
│   ├── severe.jpg
│   └── proliferative.jpg
└── __pycache__/               # File cache Python
```

## 📡 API Endpoints

### Analisis Gambar

- `POST /analyze` - Menganalisis gambar retina
  - Body: Form data dengan field `image` (file gambar)
  - Response: JSON dengan hasil analisis dan tingkat keparahan

### Status

- `GET /status` - Memeriksa status API
  - Response: JSON dengan status API dan mode (simulasi atau model nyata)

### Info Model

- `GET /model-info` - Mendapatkan informasi tentang model yang digunakan
  - Response: JSON dengan informasi model (nama, versi, akurasi, dll)

## 🤖 Model Machine Learning

API ini menggunakan model Convolutional Neural Network (CNN) yang dilatih dengan dataset gambar retina untuk mendeteksi tingkat keparahan retinopati diabetik. Model ini mengklasifikasikan gambar ke dalam 5 kategori:

- **Kelas 0**: Normal
- **Kelas 1**: Mild NPDR (Non-Proliferative Diabetic Retinopathy)
- **Kelas 2**: Moderate NPDR
- **Kelas 3**: Severe NPDR
- **Kelas 4**: Proliferative DR

### Preprocessing Gambar

Sebelum dianalisis oleh model, gambar melalui beberapa tahap preprocessing:

1. Resize ke ukuran 224x224 piksel
2. Normalisasi nilai piksel (0-1)
3. Peningkatan kontras (opsional)
4. Augmentasi data (hanya untuk pelatihan)

### Akurasi Model

Model ini memiliki akurasi sekitar 85% pada dataset pengujian. Performa model bervariasi tergantung pada kualitas gambar dan jenis kamera yang digunakan untuk mengambil gambar retina.

## 🚢 Deployment

### Deployment ke Render

1. Buat New Web Service di Render
2. Hubungkan dengan repository GitHub
3. Pilih direktori `backend/retinascan-api`
4. Konfigurasi:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app --log-level info --timeout 300 --workers 1 --threads 2 --max-requests 3 --max-requests-jitter 2 --access-logfile - --error-logfile - --keep-alive 5 --preload`
5. Tambahkan environment variables:
   ```
   PYTHON_VERSION=3.9.16
   TF_CPP_MIN_LOG_LEVEL=3
   TF_FORCE_GPU_ALLOW_GROWTH=true
   PYTHONUNBUFFERED=true
   ```
6. Deploy!

### Deployment dengan Docker

1. Build Docker image:
   ```bash
   docker build -t retinascan-api .
   ```

2. Jalankan container:
   ```bash
   docker run -p 5001:5001 retinascan-api
   ```

## 🧪 Mode Simulasi

API ini mendukung mode simulasi yang mengembalikan hasil analisis acak tanpa memuat model machine learning. Mode ini berguna untuk pengembangan dan pengujian ketika model tidak tersedia atau terlalu besar untuk dimuat.

Untuk mengaktifkan mode simulasi, tambahkan environment variable berikut:

```bash
export SIMULATION_MODE_ENABLED=true  # Di Linux/Mac
set SIMULATION_MODE_ENABLED=true     # Di Windows
```

Atau tambahkan parameter query `simulation=true` ke endpoint API:

```
POST /analyze?simulation=true
```

## 🔧 Troubleshooting

### Masalah Umum

1. **Model tidak dapat dimuat**
   - Pastikan file model (`model-Retinopaty-Diabetic.h5`) ada di direktori yang sama dengan `app.py`
   - Periksa versi TensorFlow (2.x direkomendasikan)
   - Pastikan memiliki memori yang cukup untuk memuat model

2. **Error saat preprocessing gambar**
   - Pastikan gambar dalam format yang didukung (JPG, PNG)
   - Periksa apakah gambar rusak atau tidak valid
   - Pastikan OpenCV terinstal dengan benar

3. **API tidak merespons**
   - Periksa apakah server Flask berjalan
   - Periksa log untuk error
   - Pastikan port 5001 tidak digunakan oleh aplikasi lain

### Pengujian API

Untuk menguji API tanpa frontend, gunakan script pengujian yang disediakan:

```bash
python test_api.py
```

Atau gunakan curl:

```bash
curl -X POST -F "image=@sample_images/normal.jpg" http://localhost:5001/analyze
```

### Pengujian Model

Untuk menguji model secara langsung tanpa API, gunakan script pengujian model:

```bash
python test_model.py
```

---

<div align="center">
  <p>Bagian dari proyek RetinaScan - Sistem Deteksi Retinopati Diabetik</p>
</div>
