const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cache = require('memory-cache')
const performanceAPI = require('../api/performances')

const start = (options) => {
	console.log('OPTS',options );
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()


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
        if(cacheContent && req.method === 'GET'){
          console.log('cache hit', req.method, req.originalUrl);
          res.send( cacheContent );
          return;
        }else{
          res.sendResponse = res.send;
          console.log('cache miss', req.method,req.originalUrl);
          res.send = (body) => {
            memCache.put(key,body,duration*1000);
            res.sendResponse(body);
          };
          next();
        }
      }
    };
    app.use(cacheMiddleware(300));

    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })

    performanceAPI(app, options)

    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})
