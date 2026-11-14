import express from "express";
import morgan from "morgan";
import carsRouter from "./routes/cars.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(morgan("dev"));

// main page
app.get("/", (req, res) => {
  res.json({
    name: "MotorLink",
    message: "Serwer działa poprawnie"
  });
});

app.use("/api/cars", carsRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Nie znaleziono samochodu / endpoint nie istnieje"
  });
});

app.use((err, req, res, next) => {
  
  console.error(err);

  // przekazanie odp do Express jesli naglowki zostaly juz wyslane
  
  if (res.headersSent) {
    return next(err);
  }

  
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err
  ) {
    return res.status(400).json({
      error: "Nieprawidlowe dane samochodu / Niepoprawny format JSON"
    });
  }

  // Pozostale nieoczekiwane bledy
  res.status(500).json({
    error: "Wewnetrzny blad serwera"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});