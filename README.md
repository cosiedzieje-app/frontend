# Warstwa frontendowa aplikacji

# Jak uruchomić część frontendową:
1. Upewnij się, że masz zainstalowane środowisko uruchomieniowe `Node.js` (w projekcie użyto wersji 16.17.1).
2. Zainstaluj package manager `yarn`, który posłuży do zainstalowania niezbędnych bibliotek.
```
npm install yarn@1.22.19 -g
```
3. Sklonuj repozytorium na swój lokalny dysk.
4. Przjedź do głównego katalogu i zainstaluj wymagane biblioteki za pomocą podanej komendy:
```
yarn
```
5. Stwórz plik `.env` w głównym katalogu repozytorium i zamieść w nim zmienną `VITE_BACKEND_URL` zawierającą adres URL odnoszący się do adresu serwera backendu oraz `VITE_GEO_API_KEY` zawierającą klucz dostępowy do API serwisu [positionstack](https://positionstack.com), niezbędnego do pozyskiwania koordynatów adresów.
np.:
```
VITE_BACKEND_URL="http://127.0.0.1:8000"
VITE_GEO_API_KEY="apikey"
```
6. Uruchom program za pomocą:
```
yarn dev
```
7. Po uruchomieniu strona powinna działać na `http://localhost:5173/`
