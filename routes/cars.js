
import { Router } from "express";

const router = Router();

const cars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    mileage: 82000,
    price: 65000
  },
  {
    id: 2,
    brand: "BMW",
    model: "320d",
    year: 2018,
    mileage: 182000,
    price: 79000
  },
  {
    id: 3,
    brand: "Audi",
    model: "A4",
    year: 2021,
    mileage: 120000,
    price: 105000
  }
];

let nextId = Math.max(0, ...cars.map(car => car.id)) + 1;



function parseNumber(value, integer = false, min = 0) {
  // Parametr opcjonalny - nie zostal podany
  if (value === undefined) {
    return null;
  }

  // Sprawdzenie, czy otrzymalismy tekst
  if (typeof value !== "string" || value.trim() === "") {
    return NaN;
  }

  const number = Number(value);

  // Sprawdzenie poprawnosci liczby
  if (
    !Number.isFinite(number) ||
    number < min ||
    (integer && !Number.isInteger(number))
  ) {
    return NaN;
  }

  return number;
}



router.get("/", (req, res) => {
  // Pobranie parametrow query
  const {
    q,
    brand,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    minMileage,
    maxMileage
  } = req.query;

  // Walidacja parametrow tekstowych
  if (
    (q !== undefined &&
      (typeof q !== "string" || q.trim() === "")) ||
    (brand !== undefined &&
      (typeof brand !== "string" || brand.trim() === ""))
  ) {
    return res.status(400).json({
      error: "Nieprawidlowe parametry tekstowe"
    });
  }

  // Konwersja parametrow liczbowych
  const priceFrom = parseNumber(minPrice);
  const priceTo = parseNumber(maxPrice);

  const yearFrom = parseNumber(minYear, true, 1886);
  const yearTo = parseNumber(maxYear, true, 1886);

  const mileageFrom = parseNumber(minMileage, true);
  const mileageTo = parseNumber(maxMileage, true);

  // Walidacja liczb
  const values = [
    priceFrom, priceTo,
    yearFrom, yearTo,
    mileageFrom, mileageTo
  ];

  if (values.some(value => Number.isNaN(value))) {
    return res.status(400).json({
      error: "Nieprawidlowe parametry liczbowe"
    });
  }

  // Sprawdzenie zakresow
  if (
    (priceFrom !== null && priceTo !== null &&
      priceFrom > priceTo) ||
    (yearFrom !== null && yearTo !== null &&
      yearFrom > yearTo) ||
    (mileageFrom !== null && mileageTo !== null &&
      mileageFrom > mileageTo)
  ) {
    return res.status(400).json({
      error: "Nieprawidlowy zakres filtrowania"
    });
  }

  // Utworzenie listy wynikow
  let result = [...cars];

  // Wyszukiwanie marki lub modelu
  if (q !== undefined) {
    const search = q.toLowerCase().trim();

    result = result.filter(car =>
      `${car.brand} ${car.model}`
        .toLowerCase()
        .includes(search)
    );
  }

  // Filtrowanie marki
  if (brand !== undefined) {
    result = result.filter(car =>
      car.brand.toLowerCase() === brand.toLowerCase().trim()
    );
  }

  // Filtrowanie ceny
  if (priceFrom !== null) {
    result = result.filter(car => car.price >= priceFrom);
  }

  if (priceTo !== null) {
    result = result.filter(car => car.price <= priceTo);
  }

  // Filtrowanie rocznika
  if (yearFrom !== null) {
    result = result.filter(car => car.year >= yearFrom);
  }

  if (yearTo !== null) {
    result = result.filter(car => car.year <= yearTo);
  }

  // Filtrowanie przebiegu
  if (mileageFrom !== null) {
    result = result.filter(car =>
      car.mileage >= mileageFrom
    );
  }

  if (mileageTo !== null) {
    result = result.filter(car =>
      car.mileage <= mileageTo
    );
  }

  // Zwrocenie wynikow
  res.json(result);
});







// router.get("/", (req, res) => {
//   res.json(cars);
// });

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const car = cars.find(car => car.id === id);

  if (!car) {
    return res.status(404).json({
      error: "Nie znaleziono samochodu"
    });
  }

  res.json(car);
});

router.post("/", (req, res) => {
  const { brand, model, year, mileage, price } = req.body ?? {};

  // Walidacja danych
  if (
    typeof brand !== "string" ||
    brand.trim() === "" ||
    typeof model !== "string" ||
    model.trim() === "" ||
    !Number.isInteger(year) ||
    year < 1886 ||
    year > new Date().getFullYear() + 1 ||
    typeof mileage !== "number" ||
    !Number.isFinite(mileage) ||
    mileage <= 0 ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return res.status(400).json({
      error: "Nieprawidlowe dane samochodu"
    });
  }

  // Tworzenie nowego samochodu
  const newCar = {
    id: nextId++,
    brand: brand.trim(),
    model: model.trim(),
    year,
    mileage,
    price
  };

  // Dodanie do tablicy
  cars.push(newCar);

  // Wysłanie odpowiedzi
  res.status(201).json(newCar);
});


router.put("/:id", (req, res) => {
  // Pobranie ID samochodu z adresu
  const id = Number(req.params.id);

  // Wyszukanie indeksu samochodu w tablicy
  const index = cars.findIndex(car => car.id === id);

  // Sprawdzenie, czy samochod istnieje
  if (index === -1) {
    return res.status(404).json({
      error: "Nie znaleziono samochodu"
    });
  }

  // Pobranie nowych danych
  const { brand, model, year, mileage, price } = req.body ?? {};

  // Walidacja danych
  if (
    typeof brand !== "string" ||
    brand.trim() === "" ||
    typeof model !== "string" ||
    model.trim() === "" ||
    !Number.isInteger(year) ||
    year < 1886 ||
    year > new Date().getFullYear() + 1 ||
    typeof mileage !== "number" ||
    !Number.isFinite(mileage) ||
    mileage <= 0 ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return res.status(400).json({
      error: "Nieprawidlowe dane samochodu"
    });
  }

  // Aktualizacja samochodu
  cars[index] = {
    id: cars[index].id,
    brand: brand.trim(),
    model: model.trim(),
    year,
    mileage,
    price
  };

  // Odeslanie zaktualizowanego samochodu
  res.status(200).json(cars[index]);
});

router.delete("/:id", (req, res) => {
  // Pobranie ID samochodu z adresu
  const id = Number(req.params.id);

  // Walidacja identyfikatora
  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Nieprawidlowe dane samochodu"
    });
  }

  // Wyszukanie samochodu w tablicy
  const index = cars.findIndex(car => car.id === id);

  // Sprawdzenie, czy samochod istnieje
  if (index === -1) {
    return res.status(404).json({
      error: "Nie znaleziono samochodu"
    });
  }

  // Usuniecie samochodu z tablicy
  cars.splice(index, 1);

  // Potwierdzenie usuniecia
  res.status(204).send();
});







export default router;
