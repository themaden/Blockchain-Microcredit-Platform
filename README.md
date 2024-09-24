# Blockchain Microcredit Platform

Bu proje, küçük işletme sahipleri ve girişimciler için blockchain tabanlı bir mikrokredi platformudur.

## Özellikler

- Rust ve Soroban ile geliştirilmiş akıllı sözleşme
- React ile oluşturulmuş kullanıcı arayüzü
- Kredi talebi oluşturma, fonlama ve geri ödeme işlevleri

## Gereksinimler

- Rust ve Cargo
- Node.js ve npm
- Soroban CLI
- Stellar SDK

## Kurulum

1. Projeyi klonlayın:
   ```
   git clone https://github.com/yourusername/blockchain-microcredit.git
   cd blockchain-microcredit
   ```

2. Backend için:
   ```
   cd blockchain-microcredit
   cargo build --target wasm32-unknown-unknown --release
   ```

3. Frontend için:
   ```
   cd frontend
   npm install
   ```

4. Kök dizinde `start.sh` adında bir dosya oluşturun ve içeriğini yukarıda verilen script ile doldurun.

5. Script'i çalıştırılabilir yapın:
   ```
   chmod +x start.sh
   ```

## Çalıştırma

Projeyi çalıştırmak için kök dizinde aşağıdaki komutu çalıştırın:

```
./start.sh
```

Bu komut, backend'i Stellar testnet'e deploy edecek ve frontend'i başlatacaktır.

## Kullanım

1. Tarayıcınızda `http://localhost:3000` adresine gidin.
2. "Create Loan Request" formunu kullanarak yeni bir kredi talebi oluşturun.
3. Mevcut kredi taleplerini "Active Loans" listesinde görüntüleyin.
4. "Fund" butonunu kullanarak bekleyen kredi taleplerini fonlayın.

## Katkıda Bulunma

1. Bu repo'yu fork edin
2. Yeni bir özellik dalı oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Dalınıza push yapın (`git push origin feature/AmazingFeature`)
5. Bir Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.
