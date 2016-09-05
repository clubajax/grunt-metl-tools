
"use strict";


module.exports = function (grunt) {

    function getDefaultConfig () {
        return {
            options: {
                sourceMap: true,
                // path used to link to individual less files in the browser
                sourceMapBasepath: mConfig.basePath || '/'
            },
            // 'path/to/result.css': 'path/to/source.less'
            files: {}
        };
    }

    var
        defaultPort = 8200,
        mConfig = grunt.config('metl.less'),
        host = (grunt.config('metl.less.host') || 'http://localhost:') + (grunt.config('metl.serve.port') || defaultPort),
        lessConfig = {};

    if(!mConfig){
        console.log('less capabilities not configured');
        return;
    }

    if(mConfig.src && mConfig.output){
        // only one setup
        lessConfig.main = getDefaultConfig();
        lessConfig.main.files[mConfig.output] = mConfig.src;
    }
    else{
        // multiple setups
        Object.keys(mConfig).forEach(function (key) {
            lessConfig[key] = getDefaultConfig();
            lessConfig[key].files[mConfig[key].output] = mConfig[key].src;
        });
    }



    grunt.config('less', lessConfig);
    grunt.loadNpmTasks('grunt-contrib-less');
    // shortcut:
    grunt.registerTask('ls', 'less:main');
    // if not using main, use standard: grunt less:alt
};

