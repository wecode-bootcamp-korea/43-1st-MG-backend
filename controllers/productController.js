const productService = require("../services/productService");
const { catchAsync } = require("../utils/error");

const productsInqury = catchAsync(async (req, res) => {
  let { categoryId, limit, offset } = req.query;

  limit = parseInt(limit);
  offset = parseInt(offset);

  if (!categoryId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const productsInqury = await productService.productsInqury(
    categoryId,
    limit,
    offset
  );

  return res.status(200).json({
    data: productsInqury,
  });
});

const productDetailInqury = catchAsync(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  const product = await productService.productDetailInqury(productId);
  /** 왜 제품이 존재해도 이 오류가 실행될까?
  if (!product.productId) {
    return res.status(404).json({ message: "PRODUCT_NOT_FOUND" });
  }
  */

  return res.status(200).json({
    data: product,
  });
});

const categoryList = catchAsync(async (req, res) => {
  const categoryList = await productService.categoryList();
  return res.status(200).json({
    data: categoryList,
  });
});

module.exports = {
  productsInqury,
  productDetailInqury,
  categoryList,
};
