const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("", productController.productsInqury);
router.get("/:productId", productController.productDetailInqury);

module.exports = {
  router,
};
