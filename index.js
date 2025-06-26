import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let books = [
  {
    id: 1, // SERIAL PRIMARY KEY
    title: "City of thieves", // VARCHAR(100)
    author: "David Benioff", //VARCHAR(100)
    book_cover: "https://covers.openlibrary.org/b/isbn/0452295297.jpg", // VARCHAR(255)
    isbn: "0452295297", // VARCHAR(15) UNIQUE NOT NULL, CHECK (char_length(ISBN) = 10 OR char_length(ISBN) = 13)
    ol_link: "https://openlibrary.org/isbn/0452295297", // VARCHAR(255)
  },
];

let reviews = [
  {
    id: 1, // SERIAL PRIMARY KEY
    rating: 4, // NOT NULL, CHECK (rating >= 0 AND rating <=5)
    review: "Featured in the The Last of Us Part II game. It was interesting.", // TEXT
    book_isbn: "0452295297", // VARCHAR(13)
    date_created: "2025-06-22", // DATE NOT NULL DEFAULT CURRENT_DATE
  },
];

let entries = [];

async function obtainBookReviews() {
  try {
    const result = await db.query(
      "SELECT * FROM books JOIN reviews ON books.isbn = reviews.book_isbn"
    );
    // console.log(result);
    // console.log("Number of rows: ", result.rows.length);

    if (result.rows.length > 0) {
      // console.log("You've got some results.", result.rows);
      entries = []; // To ensure there are no double-ups
      result.rows.forEach((entry) => {
        entries.push(entry);
      });
    } else {
      console.log("No reviews found for this book.");
    }
  } catch (error) {
    console.error("Error details: ", error.message);
  }
}

app.get("/", async (req, res) => {
  console.log("You're on the homepage.");

  await obtainBookReviews();
  console.log(entries);

  res.render("index.ejs", { Entries: entries });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
