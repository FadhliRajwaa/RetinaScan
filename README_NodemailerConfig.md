# Panduan Konfigurasi Nodemailer untuk RetinaScan

## Pendahuluan

Dokumen ini berisi panduan untuk mengkonfigurasi Nodemailer sebagai alternatif atau fallback jika EmailJS tidak berfungsi dengan baik. Nodemailer adalah solusi yang lebih fleksibel dan dapat diandalkan untuk mengirim email dari aplikasi Node.js.

## Persyaratan

1. Akun email Gmail (atau layanan email lainnya)
2. App Password (untuk Gmail) atau kredensial SMTP

## Konfigurasi Gmail App Password

Jika Anda menggunakan Gmail, Anda perlu membuat App Password karena Gmail tidak mengizinkan login dengan password biasa dari aplikasi pihak ketiga:

1. Masuk ke akun Google Anda
2. Buka [Security Settings](https://myaccount.google.com/security)
3. Aktifkan "2-Step Verification" jika belum aktif
4. Klik "App Passwords" di bawah bagian "Signing in to Google"
5. Pilih "Mail" dan "Other (Custom name)" dan masukkan "RetinaScan"
6. Klik "Generate" dan catat 16 karakter password yang muncul

## Konfigurasi Environment Variables

Tambahkan variabel berikut ke file `.env` Anda:

```
# Konfigurasi Nodemailer
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

## Konfigurasi Layanan Email Lainnya

Jika Anda ingin menggunakan layanan email selain Gmail, Anda perlu memodifikasi konfigurasi di `emailService.js`. Berikut adalah contoh untuk beberapa layanan populer:

### SendGrid

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

### Mailgun

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
});
```

### Outlook/Office 365

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Troubleshooting

### Error: Invalid login credentials

Solusi:
1. Pastikan EMAIL_USER dan EMAIL_PASS sudah benar
2. Untuk Gmail, pastikan Anda menggunakan App Password, bukan password akun biasa
3. Pastikan "Less secure app access" diaktifkan jika Anda menggunakan layanan selain Gmail yang memerlukan ini

### Error: Self signed certificate

Solusi:
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { 
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});
```

### Error: SMTP Connection Timeout

Solusi:
1. Periksa koneksi internet Anda
2. Pastikan port 587 atau 465 tidak diblokir oleh firewall
3. Coba gunakan layanan email alternatif

## Referensi

- [Dokumentasi Nodemailer](https://nodemailer.com/about/)
- [Panduan SMTP Gmail](https://nodemailer.com/usage/using-gmail/)
- [Dokumentasi App Password Google](https://support.google.com/accounts/answer/185833) 