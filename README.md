# 🔬 RetinaScan - Sistem Deteksi Retinopati Diabetik

<div align="center">
  
  ![RetinaScan Logo](https://img.shields.io/badge/RetinaScan-Deteksi%20Retinopati%20Diabetik-brightgreen?style=for-the-badge)
  
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
  
  Sistem analisis gambar retina menggunakan kecerdasan buatan untuk mendeteksi tingkat keparahan retinopati diabetik.
</div>

## 📋 Daftar Isi
- [Pengenalan](#-pengenalan)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Fitur Utama](#-fitur-utama)
- [Cara Penggunaan](#-cara-penggunaan)
- [Struktur Proyek](#-struktur-proyek)
- [Petunjuk Penggunaan](#-petunjuk-penggunaan)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)
- [Kontributor](#-kontributor)

## 🔍 Pengenalan

RetinaScan adalah aplikasi terintegrasi yang dirancang untuk membantu tenaga medis dalam mendeteksi tingkat keparahan retinopati diabetik melalui analisis gambar retina. Aplikasi ini menggunakan model machine learning yang dilatih dengan dataset gambar retina untuk mengklasifikasikan tingkat keparahan penyakit.

Retinopati diabetik adalah komplikasi diabetes yang memengaruhi mata dan dapat menyebabkan kebutaan jika tidak terdeteksi dan ditangani sejak dini. RetinaScan bertujuan untuk menyediakan alat bantu diagnosis yang cepat dan akurat untuk kondisi ini.

## 🏗 Arsitektur Sistem

Sistem ini terdiri dari beberapa komponen utama:

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=RetinaScan+Architecture" alt="RetinaScan Architecture" width="800"/>
</div>

1. **Backend Express (NodeJS)** 📡
   - Menangani autentikasi dan manajemen pengguna
   - Mengirim gambar ke layanan Flask
   - Menyimpan hasil ke MongoDB
   - API RESTful untuk komunikasi dengan frontend

2. **Layanan Flask (Python)** 🧠
   - Memuat model H5 untuk analisis gambar retina
   - Memproses gambar dan melakukan prediksi
   - Mengembalikan hasil analisis ke backend Express

3. **Frontend (React)** 🖥️
   - Antarmuka pengguna untuk upload gambar dan melihat hasil
   - Menampilkan riwayat analisis
   - Manajemen profil pengguna

4. **Dashboard Admin (React)** 📊
   - Monitoring aktivitas sistem
   - Manajemen pengguna
   - Statistik penggunaan dan hasil analisis

5. **Database (MongoDB)** 💾
   - Menyimpan data pengguna dan hasil analisis
   - Riwayat pemindaian
   - Konfigurasi sistem

## ✨ Fitur Utama

- **Upload Gambar Retina** 📸 - Unggah gambar retina untuk dianalisis
- **Analisis Otomatis** 🤖 - Deteksi tingkat keparahan retinopati diabetik menggunakan AI
- **Riwayat Pemindaian** 📝 - Lihat dan kelola riwayat pemindaian sebelumnya
- **Autentikasi & Keamanan** 🔒 - Sistem login dan manajemen pengguna yang aman
- **Dashboard Admin** 📊 - Pantau aktivitas sistem dan kelola pengguna
- **API Terintegrasi** 🔄 - API untuk integrasi dengan sistem eksternal
- **Mode Simulasi** 🧪 - Opsi untuk menjalankan sistem dalam mode simulasi saat layanan AI tidak tersedia

## 🚀 Cara Penggunaan

### Persyaratan
- Node.js (v14+)
- Python 3.8+
- MongoDB
- npm atau yarn

### Setup dan Menjalankan Aplikasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/RetinaScan.git
   cd RetinaScan
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Flask Service**
   ```bash
   cd backend/retinascan-api
   python -m venv venv
   source venv/Scripts/activate  # Windows
   # atau
   source venv/bin/activate      # Linux/Mac
   pip install -r requirements.txt
   ```

4. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

5. **Setup Dashboard**
   ```bash
   cd dashboard
   npm install
   ```

6. **Menjalankan Aplikasi (Windows)**
   ```bash
   cd backend
   start-services.bat
   ```
   
   **Menjalankan Aplikasi (Linux/Mac)**
   ```bash
   cd backend
   chmod +x start-services.sh
   ./start-services.sh
   ```

7. Di terminal terpisah, jalankan frontend:
   ```bash
   cd frontend
   npm run dev
   ```

8. Di terminal terpisah lainnya, jalankan dashboard:
   ```bash
   cd dashboard
   npm run dev
   ```

9. Buka aplikasi di browser:
   - Frontend: http://localhost:5173
   - Dashboard: http://localhost:3000
   - Backend API: http://localhost:5000
   - Flask API: http://localhost:5001

## 📂 Struktur Proyek

```
RetinaScan/
├── backend/                 # Backend Node.js dengan Express
│   ├── controllers/         # Controller untuk endpoint API
│   ├── models/              # Model data MongoDB
│   ├── routes/              # Definisi rute API
│   ├── middleware/          # Middleware Express
│   ├── utils/               # Fungsi utilitas
│   ├── retinascan-api/      # Flask API untuk model machine learning
│   └── app.js               # Entry point aplikasi backend
├── frontend/                # Frontend dengan React/Vite
│   ├── public/              # Asset publik
│   └── src/                 # Kode sumber frontend
│       ├── components/      # Komponen React
│       ├── pages/           # Halaman aplikasi
│       ├── services/        # Layanan API
│       └── App.jsx          # Komponen utama
└── dashboard/               # Dashboard admin dengan React/Vite
    ├── public/              # Asset publik
    └── src/                 # Kode sumber dashboard
        ├── components/      # Komponen React
        ├── pages/           # Halaman dashboard
        ├── services/        # Layanan API
        └── App.jsx          # Komponen utama
```

## 📝 Petunjuk Penggunaan

### Setup Backend

1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Buat file `.env` dengan isi:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.example.mongodb.net/RetinaScan
   JWT_SECRET=your_jwt_secret
   VITE_FRONTEND_URL=http://localhost:5173
   FLASK_API_URL=http://localhost:5001
   VITE_DASHBOARD_URL=http://localhost:3000
   PORT=5000
   ```

4. Jalankan server:
   ```bash
   npm start
   ```

### Setup Flask API

1. Masuk ke direktori retinascan-api:
   ```bash
   cd backend/retinascan-api
   ```

2. Buat virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Di Linux/Mac
   venv\Scripts\activate     # Di Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Jalankan Flask API:
   ```bash
   python app.py
   ```

### Setup Frontend & Dashboard

1. Masuk ke direktori frontend/dashboard:
   ```bash
   cd frontend
   # atau
   cd dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Buat file `.env` dengan isi yang sesuai.

4. Jalankan server:
   ```bash
   npm run dev
   ```

## 🛠 Troubleshooting

### Menguji Koneksi Flask API

Untuk menguji koneksi ke Flask API, gunakan script berikut:

```bash
cd backend
node test-flask-api.js
```

Script ini akan mencoba terhubung ke semua URL Flask API yang mungkin dan memberikan rekomendasi URL terbaik untuk digunakan.

### Mengatasi Masalah Koneksi Flask API

1. **Flask API Tidak Berjalan**
   
   Pastikan Flask API berjalan di salah satu endpoint berikut:
   - https://huggingface.co/spaces/[username]/retinascan-api (HuggingFace production)
   - http://localhost:5001 (Local development)

2. **Mode Simulasi**

   Jika Flask API tidak tersedia, aplikasi akan secara otomatis beralih ke mode simulasi.
   
   Untuk mengaktifkan mode simulasi secara manual di Flask API, tambahkan environment variable:
   ```
   SIMULATION_MODE_ENABLED=true
   ```

3. **Mengubah URL Flask API**

   Jika Flask API berjalan di URL yang berbeda, perbarui environment variable:
   ```
   FLASK_API_URL=http://your-flask-api-url
   ```

## 🚢 Deployment

### Render

Aplikasi ini siap di-deploy ke Render.com dengan konfigurasi berikut:

1. **Backend Node.js**
   - Build Command: `npm install`
   - Start Command: `node app.js`
   - Environment Variables: Lihat bagian Setup Backend

2. **Flask API (HuggingFace Spaces)**
   - Deployment ke HuggingFace Spaces menggunakan Docker SDK
   - Konfigurasi di file `backend/retinascan-api/README.md`:
     ```
     title: Retinascan API
     emoji: 🔥
     colorFrom: gray
     colorTo: red
     sdk: docker
     pinned: false
     license: mit
     ```
   - Model machine learning akan dihosting di HuggingFace untuk kemudahan akses dan skalabilitas
   - URL API: Sesuaikan dengan URL HuggingFace Space yang dibuat
   - Environment Variables:
     ```
     PYTHON_VERSION=3.9.16
     TF_CPP_MIN_LOG_LEVEL=3
     TF_FORCE_GPU_ALLOW_GROWTH=true
     PYTHONUNBUFFERED=true
     ```

3. **Frontend & Dashboard**
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
   - Environment Variables: Sesuaikan dengan URL deployment

## 👥 Kontributor

- Tim Pengembang RetinaScan

---

<div align="center">
  <p>© 2025 RetinaScan. All rights reserved.</p>
  <p>
    <a href="https://github.com/FadhliRajwaa/RetinaScan">GitHub</a> •
    <a href="https://retinascan.onrender.com/">Demo</a> •
    <a href="fadhlirajwaarahmana@gmail.com">Contact</a>
  </p>
</div> 
