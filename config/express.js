/**
 * Created by shainazt on 2/3/2015.
 */
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var favicon = require('serve-favicon');
var log=require('morgan');
var methodOverride = require('method-override');
var path = require('path');

module.exports = function(){
    var app = express();
    app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
    app.use(cors());
    app.use(log('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(methodOverride('__method'));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname,'../public/')));
    return app;
};