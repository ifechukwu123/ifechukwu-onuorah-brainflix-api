import express from "express";
import "dotenv/config";
import videoRouter from "./routes/videos.js";

const { PORT, BACKEND_URL } = process.env;
const app = express();

app.use(express.json());

app.use("/videos", videoRouter);

app.listen(PORT, () => {
	console.log(`Server is running on ${BACKEND_URL}:${PORT}`);
});
