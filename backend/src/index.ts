import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "900mb" }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("testing node setUp!");
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});

export default app;
