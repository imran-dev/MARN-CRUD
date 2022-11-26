const express = require('express');
const router  = require('./src/routes/api');
const app     = new express();

// Database
const mongoose = require('mongoose');
// let uri        = '';
// let options    = {user: '', pass: '', autoIndex: true};
// mongoose.connect(uri, options, (error) => {
//     console.log('Connection Success');
//     console.log(error);
// });

// Security Middleware
const helmet        = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss           = require('xss-clean');
const hpp           = require('hpp');
const cors          = require('cors');

// Security Middleware Library Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Rate Limiter
const rateLimit = require('express-rate-limit');
const limiter   = rateLimit({windowMs: 15 * 60 * 100, max: 3000});
app.use(limiter);

// Managing Frontend Routing
app.use(express.static('client/build'));
app.get('*', function (req, res) {
    req.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Managing Backend API Routing
app.use('/api/v1', router);

module.exports = app;