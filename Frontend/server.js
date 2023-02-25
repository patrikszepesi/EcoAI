const express = require("express");
const next = require("next");

const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
//hell


//create proxy server, redirect because for cookie based authentication(not stored in localsotrage) you need front and back to have same origin




app
  .prepare()
  .then(() => {
    const server = express();




    // apply proxy in dev mode
    if (dev) {

      server.use(
        "/api",
        createProxyMiddleware({
          target: "http://localhost:8000",
          changeOrigin: true,
        })
      );
    }

    server.all("*", (req, res) => {
      return handle(req, res);

    });

    server.listen(8080, (err) => {
      if (err) throw err;
      console.log("> Front end Ready on http://localhost:8080");
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
