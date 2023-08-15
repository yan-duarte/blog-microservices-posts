import express, { Response } from "express";
import { json } from "body-parser";
import { randomBytes } from "crypto";
import { PostPostsRequest, Posts } from "./types";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(json());
app.use(cors());

const posts: Posts = {};

app.get("/posts", (_req, res: Response<Posts>) => {
  res.send(posts);
});

app.post("/posts", async (req: PostPostsRequest, res: Response<Posts[0]>) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: posts[id],
  });

  res.status(201).send(posts[id]);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Received Event", { type, data });

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
