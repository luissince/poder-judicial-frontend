const express = require("express");
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.set('port', process.env.PORT || 80);
app.use(express.json({ limit: '1024mb' }));
app.use(express.urlencoded({ limit: '1024mb', extended: false }));

app.use(express.static(path.join(__dirname, "..", "dist")));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(app.get("port"), () => {
    console.log(`El servidor está corriendo en el puerto ${app.get("port")}`);
});