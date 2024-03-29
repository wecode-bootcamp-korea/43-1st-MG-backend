const { appDataSource } = require("./data-source");
const showProducts = async (categoryId, limit, offset) => {
  try {
    let params = [];
    let query = `SELECT
          products.id AS products_id,
          products.name AS products_name,
          products.price,
          products.thumbnail,
          products.category_id,
          categories.name AS category_name
        FROM products
        JOIN categories ON products.category_id = categories.id`;
    if (categoryId !== "0") {
      query += ` WHERE products.category_id = ?`;
      params.push(categoryId);
    }
    query += ` ORDER BY products.id DESC LIMIT ${limit} OFFSET ${offset}`;
    return await appDataSource.query(query, params);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const showProductDetail = async (productId) => {
  try {
    return await appDataSource.query(
      `SELECT
           products.id AS productId,
           products.name AS productName,
           categories.id AS categoryId,
           categories.name AS categoryName,
           products.description AS description,
           products.stock,
           products.price,
           products.thumbnail,
           JSON_ARRAYAGG(
             JSON_OBJECT(
               "productImageId", product_images.id,
               "productImageUrl", product_images.url
             )
           )AS images
         FROM products
         LEFT JOIN product_images ON product_images.product_id = products.id
         JOIN categories ON categories.id = products.category_id
         WHERE products.id = ?
       `,
      [productId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getProductList = async () => {
  try {
    let query = `SELECT
      categories.id AS categoryId,
      categories.name AS categoryName,
      COUNT(products.id) AS count
    FROM categories
    JOIN products ON products.category_id = categories.id
    GROUP BY categories.id`;
    return await appDataSource.query(query);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  showProducts,
  showProductDetail,
  getProductList,
};
