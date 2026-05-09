import "dotenv/config";
import express from "express";
import cors from "cors";
import pontosRouter from "./routes/pontos";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.use("/api/pontos", pontosRouter);

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
