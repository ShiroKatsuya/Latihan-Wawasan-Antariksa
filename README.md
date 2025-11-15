# Latihan Wawasan Antariksa

## Ringkasan Proyek

**Latihan Wawasan Antariksa** adalah aplikasi edukasi interaktif berbasis mobile yang dirancang untuk membantu pengguna belajar tentang antariksa melalui kuis interaktif dan fitur pemindaian. Aplikasi ini menyediakan materi pembelajaran tentang Tata Surya dan Gerhana dengan antarmuka yang menarik dan mudah digunakan.

## Tentang Proyek Ini

Aplikasi ini dibangun menggunakan teknologi modern untuk memberikan pengalaman belajar yang optimal:

### Teknologi yang Digunakan
- **React Native** - Framework untuk pengembangan aplikasi mobile cross-platform
- **Expo** - Platform dan toolchain untuk membangun aplikasi React Native
- **NativeWind** - Tailwind CSS untuk React Native, memberikan styling yang konsisten dan modern
- **TypeScript** - Untuk type safety dan pengembangan yang lebih robust
- **React Navigation** - Untuk navigasi antar layar dalam aplikasi

### Fitur Utama
1. **Quiz Tata Surya** - Kuis interaktif tentang sistem tata surya dengan berbagai pertanyaan edukatif
2. **Quiz Gerhana** - Kuis tentang fenomena gerhana matahari dan bulan
3. **Scan/Kamera** - Fitur pemindaian menggunakan kamera perangkat untuk pengalaman interaktif
4. **Dashboard** - Antarmuka utama dengan navigasi ke semua fitur aplikasi
5. **UI Modern** - Desain antarmuka yang menarik dengan latar belakang bintang dan animasi

## Tujuan

Aplikasi ini bertujuan untuk:
- Menyediakan media pembelajaran yang interaktif dan menarik tentang antariksa
- Membantu pengguna memahami konsep-konsep dasar tentang Tata Surya dan Gerhana
- Memberikan pengalaman belajar yang menyenangkan melalui kuis interaktif
- Meningkatkan wawasan dan pengetahuan tentang antariksa secara umum

## Instalasi di Komputer Lokal

### Prasyarat
Sebelum memulai, pastikan Anda telah menginstall:
- **Node.js** (versi 16.17.4 atau lebih tinggi)
- **npm** atau **yarn**
- **Expo CLI** (akan terinstall otomatis dengan npm)
- **Git** (untuk clone repository)

Untuk build Android:
- **Android Studio** dengan Android SDK
- **Java Development Kit (JDK)**

Untuk build iOS (hanya di macOS):
- **Xcode** dengan Command Line Tools
- **CocoaPods**

### Langkah-langkah Instalasi

1. **Clone repository atau download proyek**
   ```bash
   git clone <repository-url>
   cd VR_EDUCATIONV2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment**
   - Pastikan semua dependencies terinstall dengan benar
   - File konfigurasi sudah tersedia (app.json, eas.json, dll)

### Build untuk Web

Untuk menjalankan aplikasi di browser web:

```bash
npm run web
```

Aplikasi akan otomatis terbuka di browser default Anda. Jika tidak, buka `http://localhost:8081` atau ikuti URL yang ditampilkan di terminal.

### Build untuk Mobile (iOS/Android)

#### Android

Untuk menjalankan aplikasi di emulator atau perangkat Android:

```bash
npm run android
```

Pastikan:
- Android Studio sudah terinstall
- Android emulator sudah berjalan, atau
- Perangkat Android sudah terhubung via USB dengan USB debugging diaktifkan

#### iOS (hanya di macOS)

Untuk menjalankan aplikasi di simulator atau perangkat iOS:

```bash
npm run ios
```

Pastikan:
- Xcode sudah terinstall
- CocoaPods sudah terinstall (`sudo gem install cocoapods`)
- Jalankan `cd ios && pod install` jika diperlukan

### Build File APK

Untuk membuat file APK yang dapat diinstall di perangkat Android:

#### Menggunakan EAS Build (Recommended)

1. **Install EAS CLI** (jika belum terinstall)
   ```bash
   npm install -g eas-cli
   ```

2. **Login ke Expo account**
   ```bash
   eas login
   ```

3. **Configure project** (jika pertama kali)
   ```bash
   eas build:configure
   ```

4. **Build APK untuk preview**
   ```bash
   eas build --platform android --profile preview
   ```

   Konfigurasi build preview sudah tersedia di `eas.json` yang akan menghasilkan file APK.

5. **Build APK untuk production** (opsional)
   ```bash
   eas build --platform android --profile production
   ```

6. **Download APK**
   - Setelah build selesai, EAS akan memberikan link untuk download APK
   - Atau gunakan command: `eas build:list` untuk melihat semua build

#### Alternatif: Build Lokal dengan Gradle

Jika Anda ingin build APK secara lokal tanpa EAS:

1. **Prebuild native code**
   ```bash
   npm run prebuild
   ```

2. **Build APK menggunakan Gradle**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

   File APK akan tersedia di: `android/app/build/outputs/apk/release/app-release.apk`

## Cara Menggunakan

### Memulai Aplikasi

1. **Jalankan development server**
   ```bash
   npm start
   ```

2. **Pilih platform**
   - Tekan `w` untuk membuka di web
   - Tekan `a` untuk membuka di Android emulator/perangkat
   - Tekan `i` untuk membuka di iOS simulator (macOS only)
   - Scan QR code dengan Expo Go app di perangkat mobile Anda

### Menggunakan Fitur Aplikasi

1. **Dashboard Utama**
   - Aplikasi akan membuka layar utama "Latihan Wawasan Antariksa"
   - Tersedia menu untuk mengakses semua fitur

2. **Quiz Tata Surya**
   - Pilih menu "Quiz Tata Surya"
   - Jawab pertanyaan-pertanyaan tentang sistem tata surya
   - Lihat hasil dan skor Anda

3. **Quiz Gerhana**
   - Pilih menu "Quiz Gerhana"
   - Pelajari tentang fenomena gerhana melalui kuis interaktif
   - Tingkatkan pemahaman Anda tentang gerhana matahari dan bulan

4. **Scan/Kamera**
   - Pilih menu "Scan"
   - Gunakan kamera perangkat untuk fitur pemindaian interaktif
   - Pastikan aplikasi memiliki izin akses kamera

### Scripts yang Tersedia

- `npm start` - Menjalankan Expo development server
- `npm run web` - Menjalankan aplikasi di browser web
- `npm run android` - Menjalankan aplikasi di Android
- `npm run ios` - Menjalankan aplikasi di iOS
- `npm run prebuild` - Generate native code untuk iOS dan Android
- `npm run lint` - Menjalankan ESLint untuk mengecek kode
- `npm run format` - Format kode menggunakan ESLint dan Prettier

## Kredit

Proyek ini dikembangkan sebagai aplikasi edukasi untuk meningkatkan pemahaman tentang antariksa.

### Kontributor
- **Owner**: ShiroKatsuya

### Teknologi & Library
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)

### Lisensi
Proyek ini menggunakan lisensi MIT.

---

**Versi**: 1.0.0  
**Terakhir Diupdate**: 2025

