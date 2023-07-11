const express = require("express");
var engines = require('consolidate');
const app = express();


app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.use(express.static('static'));
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get("/", (req, res) => {
  res.render(__dirname + "/pages/index.html");
});

app.get("/swap", (req, res) => {
    res.render(__dirname + "/pages/swap.html");
})

app.get("/profile", (req, res) => {
    res.render(__dirname + "/pages/profile.html");
})

app.post("/make_transaction", (req, res) => {
    console.log(res);
})

app.get("/about", (req, res) => {
    res.render(__dirname + "/pages/about.html");
});