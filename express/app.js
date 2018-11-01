var express = require('express'),
    // router = express.Router(),
    bodyParser= require('body-parser'),
    teamPerformanceRouter = require('./routes/teamPerformanceRouter');
const app = express();
const port = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/team_performance', teamPerformanceRouter);

// Defaults
app.get('/', (req, res) => res.send('Welcome to Express API server'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
