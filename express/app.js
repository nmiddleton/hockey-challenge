var express = require('express'),
    // router = express.Router(),
    bodyParser= require('body-parser'),
    teamPerformanceRouter = require('./routes/teamPerformanceRouter'),
    leagueFixturesRouter = require('./routes/leagueFixturesRouter');
const app = express();
const port = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use('/team_performance', teamPerformanceRouter);
app.use('/league_fixtures', leagueFixturesRouter);

// Defaults
app.get('/', (req, res) => res.send('Welcome to Express API server'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
