const express = require("express");

const app = express();
const { query } = require("./data.js");

app.use(express.json());

app.post("/api20083341/books", async (req, res) => {
  const { title, author } = req.body;
  console.info(`Adding book with title ${title} by author ${author}`);

  const result = await query(
    "INSERT INTO tblbookIUH20083341 (title, author) VALUES ($1, $2) RETURNING id",
    [title, author]
  );

  res.json({ id: result[0].id });
});

app.get("/api20083341/books", async (req, res) => {
  console.info(`Getting all books`);

  const books = await query("SELECT * FROM tblbookIUH20083341");
  res.json(books);
});

app.listen(80, () => {
  console.info(`Server started listening on port 80`);
});
