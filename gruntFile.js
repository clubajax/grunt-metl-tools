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
            },
            watch:{
                less:['./test/less/*.less'],
                scripts:['./test/**/*.js'],
                port: 35730
            },
            umd:{
                src:'test/lib',
                name:'test/dist/compiled.js',
                ordered: ['main.js', 'sub1.js', 'sub2.js']
            }
        }
    });

    require(path.join(__dirname, '/tasks/index'))(grunt);
};