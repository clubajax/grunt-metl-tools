var path = require('path');

module.exports = function (grunt) {

    grunt.initConfig({
        metl:{
            less:{
                main:{
                    src:'test/less/main.less',
                    output: 'test/dist/main.css'
                },
                alt:{
                    src:'test/less/main-alt.less',
                    output: 'test/dist/main-alt.css'
                }
            }
        },
        watch:{
            less:['./style/*.less'],
            scripts:['./components/**/*.html', './components/**/*.js'],
            port: 35730
        }
    });

    require(path.join(__dirname, '/tasks/index'))(grunt);
};