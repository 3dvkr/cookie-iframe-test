const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // To handle form data

app.use((req, res, next) => {
        res.setHeader("X-Frame-Options", "ALLOWALL"); // Or 'SAMEORIGIN' if hosted together
    console.log(req.url, '\nCookies: ', req.cookies)
    // if (req.path !== "/login" && req.cookies && req.cookies.authToken !== "secure123") {
    //     return res.redirect("/login");
    // }
    if (req.path !== "/login" && req.path !== "/authenticate" && req.cookies.authToken !== "secure123") {
        return res.redirect("/login");
    }
    next();
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/authenticate", (req, res) => {
    res.cookie("authToken", "secure123", { path: "/", httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(200);
});

// Home page inside the iframe
app.get("/", (req, res) => {
    res.render("home");
});

// Second page inside the iframe
app.get("/page2", (req, res) => {
    res.render("page2");
});

app.listen(PORT, () => {
    console.log(`App 2 running at http://localhost:${PORT}`);
});
