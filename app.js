import express from "express";
import morgan from "morgan";
import carsRouter from "./routes/cars.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    name: "MotorLink",
    message: "Serwer działa poprawnie"
  });
});

app.use("/api/cars", carsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});