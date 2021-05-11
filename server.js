const express = require("express");
const userRoutes = require("./routes/user-routes")
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/api/', userRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, './public/signin.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './public/signup.html'));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});