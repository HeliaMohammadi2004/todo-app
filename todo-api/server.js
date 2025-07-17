const express = require("express");
const cors = require("cors");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const { nanoid } = require("nanoid");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 1. تعریف adapter و مقدار پیش‌فرض
const adapter = new JSONFile("db.json");
const defaultData = { todos: [] };
const db = new Low(adapter, defaultData);

// 2. تابع اصلی
async function main() {
  await db.read();
  db.data ||= defaultData; // اگر فایل json خالی بود

  // GET
  app.get("/todos", async (req, res) => {
    await db.read();
    res.json(db.data.todos);
  });

  // POST
  app.post("/todos", async (req, res) => {
    const { title } = req.body;
    const newTodo = { id: nanoid(), title, completed: false };
    db.data.todos.unshift(newTodo);
    await db.write();
    res.status(201).json(newTodo);
  });

  // PUT
  app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const updated = req.body;

    const index = db.data.todos.findIndex((t) => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });

    db.data.todos[index] = updated;
    await db.write();
    res.json(updated);
  });

  // DELETE
  app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    db.data.todos = db.data.todos.filter((t) => t.id !== id);
    await db.write();
    res.status(204).end();
  });

  // Start
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
}

main();