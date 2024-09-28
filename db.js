const categories = require("./data/categories.json");
const category_groups = require("./data/category-groups.json");
const products = require("./data/products.json");
const filters = require("./data/filters.json");
const promotional_imanges = require("./data/promotional-images.json");

module.exports = () => {
  return {
    categories,
    category_groups,
    products,
    filters,
    promotional_imanges,
  };
};
