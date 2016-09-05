'use strict';

var
    path = require('path'),
    lib = path.join(__dirname, 'lib');

module.exports = function(grunt) {

    function load (fileName) {
        require(path.join(lib + '/' + fileName))(grunt);
    }

    load('serve');
    load('less');
};