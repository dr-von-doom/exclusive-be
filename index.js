const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const db = require("./db.js")();
const router = jsonServer.router(db);
const _ = require("lodash");

server.use(middlewares);

server.get("/products/paginated", (req, res) => {
  const {
    _page = 1,
    _per_page = 10,
    _sort,
    _order = "asc",
    ...filters
  } = req.query;

  // Fetch all products from the database
  let products = router.db.get("products").value();

  // Apply filtering dynamically based on query parameters
  if (Object.keys(filters).length > 0) {
    products = _.filter(products, (product) => {
      return Object.keys(filters).every((key) => {
        const value = _.get(product, key);
        return value == filters[key]; // Compare filter value with product's property
      });
    });
  }

  // Apply sorting if _sort is provided
  if (_sort) {
    // If _sort is "price", then do no forget the discount

    if (_sort === "price") {
      products = _.orderBy(
        products,
        (product) => {
          const price = _.get(product, "price");
          const discount = _.get(product, "discount");
          return price - price * discount;
        },
        [_order]
      );
    } else {
      products = _.orderBy(products, [_sort], [_order]);
    }
  }

  // Pagination logic
  const page = parseInt(_page, 10);
  const perPage = parseInt(_per_page, 10);
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / perPage);

  // Slice products for the requested page
  const paginatedProducts = products.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // Custom response format
  res.json({
    data: paginatedProducts,
    page,
    totalPages,
    totalProducts,
  });
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
