# Motorlink
MotorLink to projekt REST API platformy ogłoszeń
motoryzacyjnych, realizowany w Node.js i Express.

## Technologie

- Node.js
- Express.js
- JavaScript (ES Modules)
- Morgan - logowanie żądań HTTP
- Thunder Client - testowanie API
- Git i GitHub - kontrola wersji

## Uruchomienie projektu

1. Sklonuj repozytorium.
2. Otwórz katalog projektu w VS Code.
3. Zainstaluj zależności:

   npm install

4. Uruchom serwer:

   npm run dev

Serwer działa pod adresem:
http://localhost:3000

## Endpointy REST

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | /api/cars | Lista samochodów |
| GET | /api/cars/:id | Szczegóły samochodu |
| POST | /api/cars | Dodanie samochodu |
| PUT | /api/cars/:id | Aktualizacja samochodu |
| DELETE | /api/cars/:id | Usunięcie samochodu |

## Przykładowe dane samochodu

POST /api/cars

{
  "brand": "Honda",
  "model": "Civic",
  "year": 2019,
  "mileage": 50000,
  "price": 58000
}

Serwer automatycznie nadaje identyfikator ID.

## Walidacja

- Marka i model muszą być niepustymi tekstami.
- Rok produkcji musi być liczbą całkowitą z
  dozwolonego zakresu.
- Przebieg musi być poprawną liczbą nieujemną.
- Cena musi być liczbą dodatnią.

## Kody odpowiedzi HTTP

- 200 OK - poprawne pobranie lub aktualizacja
- 201 Created - utworzenie samochodu
- 204 No Content - poprawne usunięcie
- 400 Bad Request - nieprawidłowe dane
- 404 Not Found - brak samochodu lub endpointu
- 500 Internal Server Error - błąd serwera

## Przechowywanie danych

W pierwszym etapie dane przechowywane są
w tablicy JavaScript w pamięci aplikacji.

Po restarcie serwera przywracane są dane
początkowe.

## Testowanie

API testowane jest za pomocą Thunder Client
w Visual Studio Code.

Sprawdzane są poprawne żądania oraz błędy
walidacji i nieistniejące zasoby.
