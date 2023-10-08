const router = require("express").Router();
const {
  addBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books-controller");
const { authRoutes } = require("../middlewares/auth");

router.route("/create").post(createBook);
router.route("/update").put(updateBook);
router.route("/delete").delete(deleteBook);
router.route("/").post(addBook).get(getBooks);

module.exports = router;
