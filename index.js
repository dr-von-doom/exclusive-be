const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const db = require("./db.js")();
const router = jsonServer.router(db);

server.use(middlewares);

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
