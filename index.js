var config = require('./app/config/config')
var express = require('express')
var https = require('http')
var path = require('path')
var fs = require("fs")
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express();
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    // var routes = require('./app/routes/index');
    var api = require('./app/routes/api');

    // app.use('/', routes);
    app.use('/api', api);

    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      // res.render('error', {
      //     message: err.message,
      //     error: {}
      // });
      var result = {
          code: 300,
          data: {},
          message: "something error"
      };
      res.send(result);
     });

    app.set('port', process.env.PORT || config.serverPort);

    var server = https.createServer(app).listen(config.serverPort, function () {
      console.log('Express server listening on port ' + server.address().port);
    });