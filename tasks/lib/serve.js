'use strict';

module.exports = function (grunt) {
    var
        config = grunt.config('metl.serve') || {},
        testServer = {
            host: config.host || 'localhost',
            port: config.port || '8200',
            proxy: config.proxy
        },
        servePath = config.serverPath || '.';

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

    grunt.registerTask('serve', function () {
        grunt.task.run('http-server');
    });
};