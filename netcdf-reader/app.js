const fs = require('fs');
const express = require('express')

const nc = require('./netcdf/netcdf')
const file = 'resources/netcdf-data/sresa1b_ncar_ccsm3-example.nc';

var app = express()

var filePath = 'resources/netcdf-data/';

var data;// = nc.openFile(file);


app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.get('/', function (req,res) {
    res.send(nc.getFiles(filePath) );
})

app.get('/:file', function (req,res) {
    data = nc.openFile(filePath+req.params.file);
    res.send(data);
})

app.get('/:file/head(er)?(s)?(.:header)?', function (req, res) {
    data = nc.openFile(filePath+req.params.file);
    (req.params.header) ? res.send(nc.getHeaderElement(data,req.params.header)): res.send(nc.getHeader(data)) ;
});

app.get('/:file/var(iable)?(s)?(/:variable)?', function (req, res) {
    data = nc.openFile(filePath+req.params.file);
    (req.params.variable) ? res.send(nc.getDataVariable(data,req.params.variable)): res.send(nc.getHeaderElement(data,'variables'));
})

app.listen(3000)

// 
 
// // http://www.unidata.ucar.edu/software/netcdf/examples/files.html 
// const file = 'resources/netcdf-data/sresa1b_ncar_ccsm3-example.nc';

// var data = nc.openFile(file);
// var header = nc.getHeader(data);
// var dimensions = nc.getHeaderElement(data,'dimensions');
// var globalAttributes = nc.getHeaderElement(data, 'globalAttributes');
// var variables = nc.getHeaderElement(data, 'variables');

// console.log(globalAttributes);
