// Data Transform Object

class IssuedBook {
  _id;
  name;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  constructor(userDetail) {
    this._id = userDetail.issuedBook._id;
    this.name = userDetail.issuedBook.name;
    this.genre = userDetail.issuedBook.genre;
    this.price = userDetail.issuedBook.price;
    this.publisher = userDetail.issuedBook.publisher;
    this.issuedBy = userDetail.name;
    this.issuedDate = userDetail.issuedDate;
    this.returnDate = userDetail.returnDate;
  }
}

module.exports = IssuedBook;
