# Panduan Konfigurasi EmailJS untuk RetinaScan

## Pendahuluan

Dokumen ini berisi panduan konfigurasi EmailJS untuk aplikasi RetinaScan. EmailJS digunakan untuk mengirim email reset password dan notifikasi lainnya.

## Persyaratan

1. Akun EmailJS (bisa dibuat gratis di [emailjs.com](https://www.emailjs.com/))
2. Layanan email yang terhubung (Gmail, Outlook, atau lainnya)

## Langkah-langkah Konfigurasi

### 1. Mengaktifkan API untuk Aplikasi Non-Browser

Secara default, EmailJS memblokir API calls dari aplikasi non-browser (seperti backend Node.js). Untuk mengaktifkannya:

1. Login ke akun EmailJS di [emailjs.com](https://www.emailjs.com/)
2. Klik **Account** di pojok kanan atas
3. Pilih tab **Security**
4. Aktifkan opsi **Allow EmailJS API for non-browser applications**
5. Simpan perubahan

Tanpa mengaktifkan opsi ini, Anda akan mendapatkan error `API calls are disabled for non-browser applications`.

### 2. Membuat Template Reset Password

1. Login ke dashboard EmailJS
2. Buat template baru untuk reset password dengan ID `template_j9rj1wu` atau sesuaikan dengan nilai di `.env`
3. Gunakan HTML berikut sebagai referensi (sesuaikan sesuai kebutuhan):

```html
<!DOCTYPE html>
<html>
<head>
    <title>Reset Password RetinaScan</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            background-color: #3b82f6;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .code {
            background-color: #eee;
            padding: 10px 15px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 18px;
            letter-spacing: 2px;
            text-align: center;
            margin: 15px 0;
        }
        .footer {
            font-size: 12px;
            color: #666;
            text-align: center;
            margin-top: 30px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>RetinaScan</h2>
    </div>
    
    <div class="content">
        <h2>Reset Password</h2>
        <p>Halo {{to_name}},</p>
        <p>Kami menerima permintaan untuk mereset password akun {{app_name}} Anda. Gunakan tombol di bawah ini untuk melanjutkan:</p>
        
        <div style="text-align: center;">
            <a href="{{reset_link}}" class="button">Reset Password</a>
        </div>
        
        <p>Atau gunakan kode reset password berikut:</p>
        <div class="code">{{reset_token}}</div>
        
        <p>Jika Anda tidak membuat permintaan ini, abaikan email ini dan password Anda tidak akan berubah.</p>
    </div>
    
    <div class="footer">
        <p>Email ini dikirim secara otomatis, mohon jangan membalas email ini.</p>
        <p>&copy; 2023 RetinaScan. Semua hak dilindungi.</p>
    </div>
</body>
</html>
```

### 3. Variabel Template

Pastikan template Anda menggunakan variabel-variabel berikut:

- `{{to_name}}` - Nama penerima
- `{{to_email}}` - Email penerima (dapat digunakan dalam field To: pada pengaturan template)
- `{{reset_link}}` - Link untuk melakukan reset password
- `{{reset_token}}` - Kode verifikasi untuk reset password
- `{{app_name}}` - Nama aplikasi (RetinaScan)

### 4. Konfigurasi Environment Variables

Pastikan file `.env` di backend memiliki nilai-nilai berikut:

```
EMAILJS_SERVICE_ID=Email_Fadhli_ID
EMAILJS_RESET_TEMPLATE_ID=template_j9rj1wu
EMAILJS_PUBLIC_KEY=ePRBcl6owJJMsYqVJ
EMAILJS_PRIVATE_KEY=Pwcmv8eQ5Sm4XCKdFW7Kg
```

### 5. Konfigurasi Template di Dashboard EmailJS

Saat mengonfigurasi template di dashboard EmailJS, pastikan:

1. **Recipient Email** diatur untuk menggunakan variabel `{{to_email}}`
2. **Reply-To** diatur untuk menggunakan variabel `{{reply_to}}`
3. **From Name** diatur untuk menggunakan variabel `{{from_name}}`
4. **Subject** diatur untuk menggunakan variabel `{{subject}}`

Tanpa konfigurasi yang tepat di dashboard EmailJS, Anda akan menerima error "Parameter tidak lengkap" meskipun semua parameter sudah disediakan dalam kode.

### 6. Verifikasi Pengaturan EmailJS

1. Login ke dashboard EmailJS
2. Pilih service Email_Fadhli_ID
3. Pastikan service telah terhubung dengan benar ke penyedia email (Gmail, Outlook, dll)
4. Pastikan template sudah dibuat dan diuji
5. Verifikasi bahwa opsi "Allow EmailJS API for non-browser applications" sudah diaktifkan di halaman Account > Security

## Troubleshooting

### Error: API calls are disabled for non-browser applications

Solusi: Ikuti langkah 1 untuk mengaktifkan API untuk aplikasi non-browser.

### Error: The recipients address is empty

Solusi: 
1. Pastikan parameter `to_email` terisi dan template EmailJS menggunakan variabel ini sebagai alamat penerima.
2. Di dashboard EmailJS, edit template dan pastikan field "To Email" menggunakan variabel `{{to_email}}`.

### Error: Parameter tidak lengkap

Solusi:
1. Pastikan semua parameter yang dibutuhkan template telah disediakan dalam objek `templateParams`.
2. Verifikasi bahwa template di dashboard EmailJS dikonfigurasi dengan benar (To Email, Reply-To, From Name, Subject).
3. Tambahkan parameter tambahan seperti `reply_to`, `from_name`, dan `subject` dalam kode.

## Referensi

- [Dokumentasi EmailJS](https://www.emailjs.com/docs/)
- [Dokumentasi Node.js SDK](https://www.emailjs.com/docs/sdk/installation/#nodejs) 