import express from "express";
import "dotenv/config";
import cors from "cors";
import videoRouter from "./routes/videos.js";

const { PORT, BACKEND_URL, CORS_ORIGIN_URL } = process.env;
const app = express();

app.use(cors({ origin: CORS_ORIGIN_URL }));
app.use(express.json());
app.use(express.static("./public"));
app.use("/videos", videoRouter);

app.listen(PORT, () => {
	console.log(`Server is running on ${BACKEND_URL}:${PORT}`);
});
