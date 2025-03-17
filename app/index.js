const express = require("express");
const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Middleware to allow embedding in iframes
app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL"); // Or 'SAMEORIGIN' if hosted together
    next();
});

// Home page inside the iframe
app.get("/", (req, res) => {
    res.render("home");
});

// Another page inside the iframe
app.get("/page2", (req, res) => {
    res.render("page2");
});

app.listen(PORT, () => {
    console.log(`App 2 running at http://localhost:${PORT}`);
});
