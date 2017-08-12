const express = require('express')
const nc = require('./netcdf/netcdf')
const filePath = 'resources/netcdf-data/';

var app = express()

// Once a file is first read from disk, maintain contents in a map
// so each subsequent call doesn't reopen file.
var openFiles = {};
var openFile = (fileName) => {
    if (!openFiles[fileName]) {
        openFiles[fileName] = nc.openFile(filePath+fileName);
    }
}
// Workaround browser asking for favicon
app.get('/favicon.ico', function(req, res) {
    res.status(204);
});
// List file in the directory path
app.get('/', function (req,res) {
    res.send(nc.getFiles(filePath) );
})
// Get the entire file and render as json
app.get('/:file', function (req,res) {
    openFile(req.params.file);
    res.send(openFiles[req.params.file]);
})
// Get the headers and optionally drill in to each one level with dot notation
app.get('/:file/head(er)?(s)?(.:header)?', function (req, res) {
    openFile(req.params.file);
    (req.params.header) ?
        res.send(nc.getHeaderElement(openFiles[req.params.file],req.params.header)):
            res.send(nc.getHeader(openFiles[req.params.file])) ;
});
// Return specific variables, list vars from header if not passed in path
app.get('/:file/var(iable)?(s)?(/:variable)?', function (req, res) {
    openFile(req.params.file);
    (req.params.variable) ?
        res.send(nc.getDataVariable(openFiles[req.params.file],req.params.variable)):
            res.send(nc.getHeaderElement(openFiles[req.params.file],'variables'));
})

app.listen(3000) 
 