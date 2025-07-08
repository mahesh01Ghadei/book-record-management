const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
//importing routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
//Database connection
const DbConnection = require("./databaseConnection");
dotenv.config();

const app = express();
DbConnection();
const PORT = process.env.PORT || 8081;

app.use(cookieParser());
app.use(express.json());
app.use(csrf({ cookie: true }));
// CSRF error handler
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  // handle CSRF token errors here
  res.status(403).json({ message: 'Form tampered with' });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
