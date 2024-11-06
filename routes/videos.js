import express from "express";
import fs from "fs";
import { v4 as uuid } from "uuid";

const router = express.Router();

function getData() {
	const data = fs.readFileSync("./data/videos.json");
	return JSON.parse(data);
}

router
	.route("/")
	.get((req, res) => {
		const videoData = getData();
		const responseData = videoData.map((video) => ({
			id: video.id,
			title: video.title,
			channel: video.channel,
			image: video.image,
		}));
		res.json(responseData).status(200);
	})
	.post((req, res) => {
		const { title, description } = req.body;
		const videoData = getData();
		const newData = {
			id: uuid(),
			title: title,
			channel: "Berri Onuorah",
			image: "delete this",
			description: description,
			views: "900,000",
			likes: "150,000",
			duration: "5:05",
			video: "delete this",
			timestamp: Date.now(),
			comments: ["delete please"],
		};

		fs.writeFileSync(
			"./data/videos.json",
			JSON.stringify([...videoData, newData])
		);
		res.json(newData).status(201);
	});

router.get("/:id", (req, res) => {
	const videoData = getData();
	const video = videoData.find((video) => video.id === req.params.id);

	if (!video) {
		res.status(404).send(`Video with id: ${req.params.id} not found`);
	} else {
		res.json(video).status(200);
	}
});

export default router;
