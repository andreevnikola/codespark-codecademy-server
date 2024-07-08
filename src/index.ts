// src/index.ts
import express from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static("static/websites"));

app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.sendFile(
      path.join(__dirname, "..", "static", "pages", "not-found.html")
    );
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
