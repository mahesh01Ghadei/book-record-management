const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
} = require("../controllers/books-controller");

const router = express.Router();

/**
 * Route : /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: none
 */

router.get("/", getAllBooks);

/**
 * Route : /books/:id
 * Method: GET
 * Description: Get book by id
 * Access: Public
 * Parameters: id
 */

router.get("/:id", getSingleBookById);

/**
 * Route : /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route : /books
 * Method: POST
 * Description: Create new book
 * Parameters: none
 * Access: Public
 * Data : author, name, genre, price, publisher, id
 */

router.post("/", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "NO data provided",
    });
  }

  const book = books.find((each) => each.id === data.id);

  if (book) {
    return res.status(404).json({
      success: false,
      message: " Book already exists with this id ,please use an unique id",
    });
  }
  const allBooks = { ...books, data };

  return res.status(200).json({
    success: true,
    data: allBooks,
  });
});

/**
 * Route : /books/:id
 * Method: PUT
 * Description: Update book
 * Parameters: id
 * Access: Public
 * Data : author, name, genre, price, publisher, id
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found with this parameter",
    });
  }

  const updateData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });

  return res.status(200).json({
    success: true,
    data: updateData,
  });
});

/**
 * Route : /books/issued/by-user/with-fine
 * Method: GET
 * Description: Get all issued books with fine
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-user/with-fine", (req, res) => {
  const id = req.params;

  const user = users.find((each) => each.id === id);

  const issuedBooksWithFine = [];

  const usersWithIssuedBooks = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];
  usersWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    issuedBooks.push(book);
    if (book) {
      const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
          // current date
          date = new Date();
        } else {
          // getting date on bacis of data variable
          date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
      };

      let returnDate = getDateInDays(each.returnDate);
      let currentDate = getDateInDays();

      if (returnDate < currentDate) {
        issuedBooksWithFine.push(book.name);
      }
    }
  });

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No books issued yet",
    });
  }

  if (issuedBooksWithFine.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No issued books with fine exists",
    });
  }

  return res.status(200).json({
    success: "true",
    data: issuedBooksWithFine,
  });
});

// default export
module.exports = router;
