import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getItems() {
  const result = await db.query("SELECT * FROM items order by id ASC");
  return result.rows;
}


app.get("/", async (req, res) => {
  let items = await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.post("/edit", async (req, res) => {
  const itemTitle = req.body.updatedItemTitle;
  const id= req.body.updatedItemId;

  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [itemTitle, id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.post("/delete", (req, res) => {
  const id = req.body.deleteItemId;
  try {
    db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
