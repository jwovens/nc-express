const nc = require('../netcdf/netcdf')
const fs = require('fs');
const _ = require('lodash');

const NetCDFReader = require('netcdfjs');

const file = 'resources/netcdf-data/sresa1b_ncar_ccsm3-example.nc';

var data = nc.openFile(file);
//console.log(data);

// console.log(data.header.dimensions);

var variable_dimensions = _.filter(data.header.variables, {'name':'pr'} )[0].dimensions ;

var a = _.map(_.filter(data.header.variables, {'name':'pr'} )[0].dimensions, 
    (dim) => {
        //return `{ '${data.header.dimensions[dim].name}' : ${data.getDataVariable(data.header.dimensions[dim].name)} }`;
        return `{ '${data.header.dimensions[dim].name}' : ${data.getDataVariable(data.header.dimensions[dim].name)} }`; 
    }
);
a.push(data.getDataVariable('pr')[0]);
console.log(a);
