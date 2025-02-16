import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import userRoutes from "./routes/userRoutes";

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "900mb" }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("testing node setUp!");
});
app.use("/api/v1/users", userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

});

export default app;
