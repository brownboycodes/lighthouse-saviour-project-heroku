if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

const path = require("path");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");


const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");


let app = express();

const dbURI = process.env.DB_URI;

// CONNECT mongoDB
//TODO: create and authenticate database connection
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(PORT, () =>
      console.log(
        `database loading completed and server is listening for requests on port ${PORT}`
      )
    )
  )
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//TODO: set tempalte engine

app.set("view engine", "ejs");

//TODO: set static folder
app.use(express.static(path.join(__dirname, "public")));

//TODO: creating default route
const router = express.Router();
app.use(express.json({ limit: "1mb" }));

app.use("/", require("./routes/mousetrap"));

//TODO: create logger using morgan node module
if (process.env.NODE_ENV !== "production") {
  let morgan = require("morgan");
  app.use(morgan("dev"));
}

//TODO: create and authenticate database connection


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests,
});

app.use(limiter);

app.use(compression());
app.use(helmet());
app.use(cors());
