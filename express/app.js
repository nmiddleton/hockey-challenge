var express = require('express'),
    // router = express.Router(),
    bodyParser= require('body-parser'),
    teamPerformanceRouter = require('./routes/teamPerformanceRouter'),
    leagueFixturesRouter = require('./routes/leagueFixturesRouter'),
    cache = require('memory-cache');
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

//Cache
let memCache = new cache.Cache();
let cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key =  '__express__' + req.originalUrl || req.url;
    let cacheContent = memCache.get(key);
    if(cacheContent){
      res.send( cacheContent );
      return;
    }else{
      res.sendResponse = res.send;
      res.send = (body) => {
        memCache.put(key,body,duration*1000);
        res.sendResponse(body);
      };
      next();
    }
  }
};
app.use(cacheMiddleware(300));

// Routes
app.use('/team_performance',teamPerformanceRouter);
app.use('/league_fixtures', leagueFixturesRouter);

// Defaults
app.get('/', cacheMiddleware(300), (req, res) => res.send('Welcome to Express API server'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
