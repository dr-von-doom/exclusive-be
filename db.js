const categories = require("./data/categories.json");
const categoryGroups = require("./data/category-groups.json");
const products = require("./data/products.json");
const filters = require("./data/filters.json");
const promotionalImanges = require("./data/promotional-images.json");

module.exports = () => {
  return {
    categories,
    categoryGroups,
    products,
    filters,
    promotionalImanges,
  };
};
