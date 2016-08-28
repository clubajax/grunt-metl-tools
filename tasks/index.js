'use strict';

var
    path = require('path');

module.exports = function(grunt) {
    //require('./lib/serve');
    require(path.join(__dirname, 'lib/serve'))(grunt);
};
