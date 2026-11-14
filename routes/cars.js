
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

router.get("/", (req, res) => {
  res.json(cars);
});

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











export default router;
