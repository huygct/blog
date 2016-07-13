/*jshint node:true*/
'use strict';

var compression = require('compression')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.argv[2] || 9001;
var four0four = require('./utils/404')();

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.configure(function(){
  // Here we require the prerender middleware that will handle requests from Search Engine crawlers
  // We set the token only if we're using the Prerender.io service
  app.use(require('prerender-node').set('prerenderToken', 'jUp4iqXdWXCrLnUUrEii'));
});
//app.use('/api', require('./routes'));

console.log('** BUILD **');
// Use compress middleware to gzip content
app.use(compression());
app.use(express.static('./'));
// Any invalid calls for templateUrls are under app/* and should return 404
app.use('/*', function(req, res) {
  res.sendfile("index.html", { root: __dirname + "/" });
  //four0four.send404(req, res);
});
// Any deep link calls should return index.html
app.use('/*', express.static('./index.html'));


app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
