const dotenv = require('dotenv').config();
const express = require('express');

const path = require('path');


const ejs = require('ejs');
let morgan = require('morgan');

const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

let bodyParser = require('body-parser');
let app = express();


//TODO: create application/json parser
let jsonParser = bodyParser.json;
app.use(bodyParser.urlencoded({ extended: false }));

//TODO: set tempalte engine

app.set('view engine', 'ejs');

//TODO: create logger using morgan node module
app.use(morgan('dev'));

//TODO: set static folder
app.use(express.static(path.join(__dirname, 'public')));

//TODO: creating default route
const router = express.Router();
app.use(express.json({ limit: '1mb' }));

app.use('/', require('./routes/mousetrap'));




//TODO: create and authenticate database connection

const db = require('./config/database');

db.authenticate()
    .then(() => console.log('connection to database established'))
    .catch(err => console.log("error: " + err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running on port ${PORT}`));


// const isProduction = process.env.NODE_ENV === 'production';
// const origin = {
//     origin: isProduction ? 'https://www.thelighthousesaviourproject.com' : '*',
// };

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // 5 requests,
});

app.use(limiter)

app.use(compression());
app.use(helmet());
app.use(cors());

