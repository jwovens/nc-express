const fs = require('fs');
const NetCDFReader = require('netcdfjs');

var getFiles = (fileDir) => {
    return fs.readdirSync(fileDir);
}

var openFile = (filePath) => {
    var data = fs.readFileSync(filePath);
    return new NetCDFReader(data);
};

var getHeader = (file) => {
    return file.header;
};

var getHeaderElement = (file, element) => {
    return file.header[element];
};

var getDataVariable = (file, variable) => {
    return file.getDataVariable(variable);
};

module.exports = {
    getFiles,
    openFile,
    getHeader,
    getHeaderElement,
    getDataVariable
};