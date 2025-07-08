# Story App - Progressive Web Application

**Story App** adalah sebuah aplikasi web progresif (PWA) yang memungkinkan pengguna untuk berbagi cerita singkat beserta lokasi dan gambar.  
Aplikasi ini dibangun sebagai **Proyek Akhir** untuk kelas _"Belajar Front-End Web untuk Pemula"_ di **Dicoding**, dengan menerapkan berbagai teknologi web modern untuk menciptakan pengalaman layaknya aplikasi native.

---

## ✨ Fitur Utama

### ✅ Fitur Fungsional:

- **Autentikasi Pengguna**: Sistem registrasi dan login yang aman.
- **Beranda (Daftar Cerita)**: Menampilkan semua cerita dari pengguna lain, lengkap dengan peta lokasi.
- **Tambah Cerita Baru**: Pengguna dapat mengunggah cerita baru dengan deskripsi, gambar (diambil langsung dari kamera perangkat), dan lokasi (diambil dari Geolocation API).
- **Detail Cerita**: Halaman khusus untuk melihat detail lengkap dari satu cerita, termasuk peta lokasi yang interaktif.
- **Halaman Not Found**: Halaman 404 yang informatif jika pengguna mengakses URL yang tidak valid.

### 📱 Fitur Progressive Web App (PWA):

- **Dapat Di-install (Installable)**: Aplikasi dapat dipasang di home screen perangkat mobile maupun desktop.
- **Dukungan Offline**: Berkat implementasi **Workbox**, aplikasi dapat diakses dan digunakan bahkan saat tidak ada koneksi internet. Data cerita yang sudah pernah dimuat akan disajikan dari cache.
- **Push Notification**: Aplikasi dapat menerima notifikasi dari server untuk memberikan update kepada pengguna.
- **App Shortcuts & Screenshots**: Menyediakan shortcut "Tambah Cerita" dari ikon aplikasi dan menampilkan pratinjau aplikasi selama proses instalasi.

### ➕ Fitur Tambahan:

- **Penyimpanan Lokal dengan IndexedDB**: Data cerita dari API secara otomatis disimpan di IndexedDB untuk meningkatkan kemampuan offline.
- **Transisi Halaman Halus**: Transisi antar halaman dirancang agar mulus dan tidak mengganggu pengguna.

---

## ⚙️ Teknologi yang Digunakan

- **Bundler**: Webpack 5
- **Service Worker & Caching**: Workbox
- **Framework & Library**:
  - [Leaflet.js](https://leafletjs.com/) – untuk peta interaktif
  - [idb](https://github.com/jakearchibald/idb) – untuk mempermudah penggunaan IndexedDB
  - [Font Awesome](https://fontawesome.com/) – untuk ikon
- **API**: Story API dari Dicoding

---

## 🛠️ Instalasi, Membangun Proyek & Lisensi

```bash
# Clone repositori ini:
git clone https://github.com/fahri238/Story-App.git

# Masuk ke direktori proyek:
cd NAMA_REPO_ANDA

# Install semua dependency:
npm install

# Jalankan server development:
npm run start-dev

# Aplikasi akan berjalan di http://localhost:8080.

# Membangun proyek untuk produksi:
npm run build

# Perintah ini akan membuat folder 'dist' yang berisi semua file statis
# yang sudah dioptimalkan dan siap untuk diunggah ke platform hosting.

# Lisensi:
# Proyek ini dibuat untuk tujuan pembelajaran dan pengembangan pribadi.
# Gunakan dan modifikasi sesuai kebutuhan.
```
