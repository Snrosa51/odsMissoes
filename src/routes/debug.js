// src/routes/debug.js
const express = require("express");
const router = express.Router();

router.get("/routes", (req, res) => {
  const routes = [];

  req.app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // rotas diretas
      routes.push({
        method: Object.keys(middleware.route.methods)[0].toUpperCase(),
        path: middleware.route.path
      });
    } else if (middleware.name === "router") {
      // rotas agrupadas (router)
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            method: Object.keys(handler.route.methods)[0].toUpperCase(),
            path: handler.route.path
          });
        }
      });
    }
  });

  res.json({
    total: routes.length,
    routes
  });
});

module.exports = router;
