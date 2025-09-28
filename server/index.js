import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url";
import { generateText } from "./lib/llmAdapter.js";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// rotas API
app.get("/api/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  const { title, content, userId } = req.body;
  const post = await prisma.post.create({
    data: { title, content, authorId: userId }
  });
  res.json(post);
});

app.post("/api/autocomplete", async (req, res) => {
  const { title, userId } = req.body;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const suggestion = await generateText(title, user?.tags || []);
  res.json({ suggestion });
});

app.post("/api/users", async (req, res) => {
  const { email, name, bio, tags } = req.body;
  const user = await prisma.user.create({
    data: { email, name, bio, tags }
  });
  res.json(user);
});

// serve frontend (dist)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../web/dist");

app.use(express.static(distPath));
app.get("*", (_, res) => res.sendFile(path.join(distPath, "index.html")));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
