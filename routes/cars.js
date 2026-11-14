
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

router.get("/", (req, res) => {
  res.json(cars);
});

export default router;
