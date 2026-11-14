import express from "express";
import morgan from "morgan";

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});