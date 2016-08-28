'use strict';

var
    path = require('path');

module.exports = function(grunt) {
    require('./src/serve');
    require(path.join(__dirname, 'src/serve'))(grunt);
};
