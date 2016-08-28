'use strict';

module.exports = function (grunt) {
    var
        gruntConfig = grunt.config('metl.server'),
        testServer = {
            host: 'localhost',
            port: '8200'
        },
        servePath = '.',
        testServerUrl = 'http://' + testServer.host + ':' + testServer.port;

    grunt.config('http-server', {
        'dev': {
            root: servePath,
            port: testServer.port,
            host: testServer.host,
            cache: -1,
            showDir: true,
            autoIndex: true,
            ext: "html",
            runInBackground: false,
            proxy: testServer.proxy
        }
    });

    grunt.loadNpmTasks('grunt-http-server');
};