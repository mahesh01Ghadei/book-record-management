const issuedBook = require("../dtos/book-dto");
const { UserModel, BookModel } = require("../models");

exports.getAllBooks = async (req, res) => {
  const allBooks = await BookModel.find();

  if (allBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No book found",
    });
  }
  res.status(200).json({
    success: true,
    data: allBooks,
  });
};
exports.getSingleBookById = async (req, res) => {
  const { bookid } = req.params;
  const book = await BookModel.findById(bookid);
  if (!book) {
    return res.status(404).json({
      success: false,
      data: "Book not found",
    });
  }
  res.status(200).json({
    success: true,
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true },
  }).populated(issuedBook);

  const issuedBooks = users.map((user) => new issuedBook(user));

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No books issued yet",
    });
  }
  return res.status(200).json({
    success: true,
    data: issuedBooks,
  });
};
