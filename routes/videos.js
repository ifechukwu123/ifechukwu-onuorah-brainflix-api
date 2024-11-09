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
			image: "/images/image9.jpg",
			description: description,
			views: "900,407",
			likes: "120,439",
			duration: "5:45",
			video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
			timestamp: Date.now(),
			comments: [
				{
					id: uuid(),
					name: "Arjen Steenbakker",
					comment:
						"Exploring the stories behind famous paintings has made art history come alive. I appreciate the diverse selection of masterpieces you've covered, providing a well-rounded view of different periods and styles. Looking forward to more episodes where art and storytelling beautifully intersect!",
					likes: 1,
					timestamp: 1698297462000,
				},
				{
					id: uuid(),
					name: "Ambrus Gerzson",
					comment:
						"Can't wait for more documentaries that celebrate the harmony of our natural world!",
					likes: 0,
					timestamp: 1680239862000,
				},
				{
					id: uuid(),
					name: "Cleo Polster",
					comment:
						"Your video on mindful living came at the perfect time for me. Your practical tips for embracing serenity in daily life are incredibly helpful. I'm already feeling more centered and present. Grateful for the calming influence you bring to your content!",
					likes: 2,
					timestamp: 1676441862000,
				},
			],
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
