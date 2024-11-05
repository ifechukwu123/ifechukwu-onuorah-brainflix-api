import express from "express";

const router = express.Router();

router
	.route("/")
	.get((req, res) => {
		res.send("Calling get request");
	})
	.post((req, res) => {
		res.send("Calling Post request");
	});

router.get("/:id", (req, res) => {
	res.send(`Calling get request for video with id ${req.params.id}`);
});

export default router;
