# RetinaScan - Sistem Deteksi Retinopati Diabetik

RetinaScan adalah aplikasi untuk analisis gambar retina menggunakan model AI untuk mendeteksi tingkat keparahan retinopati diabetik.

## Arsitektur Sistem

Sistem ini terdiri dari beberapa komponen utama:

1. **Backend Express (NodeJS)**
   - Menangani autentikasi dan manajemen pengguna
   - Mengirim gambar ke layanan Flask
   - Menyimpan hasil ke MongoDB

2. **Layanan Flask (Python)**
   - Memuat model H5 untuk analisis gambar retina
   - Memproses gambar dan melakukan prediksi

3. **Frontend (React)**
   - Antarmuka untuk upload gambar dan melihat hasil
   - Menampilkan riwayat analisis

4. **Database (MongoDB)**
   - Menyimpan data pengguna dan hasil analisis

## Cara Penggunaan

### Persyaratan
- Node.js
- Python 3.8+
- MongoDB

### Setup dan Menjalankan Aplikasi

1. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

2. **Setup Flask Service**
   ```bash
   cd backend/flask_service
   python -m venv venv
   source venv/Scripts/activate  # Windows
   # atau
   source venv/bin/activate      # Linux/Mac
   pip install -r requirements.txt
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Menjalankan Aplikasi (Windows)**
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

5. Di terminal terpisah, jalankan frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. Buka aplikasi di browser: http://localhost:5173

## Fitur Utama

- Upload gambar retina
- Analisis tingkat keparahan retinopati diabetik
- Riwayat pemindaian
- Autentikasi dan manajemen pengguna 