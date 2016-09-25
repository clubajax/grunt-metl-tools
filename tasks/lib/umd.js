"use strict";

var
    prefix =
        '(function (define) {\n'+
        '\tdefine([{{DEPSSTR}}], function ({{DEPS}}) {',

    suffix =
        '\t});\n' +
        '}(\n'+
        '\ttypeof define === "function" && define.amd ? define : function (ids, factory) {\n'+
        '\t\tvar deps = ids.map(function (id) {\n'+
        '\t\treturn typeof require === "function" ? require(id) : window[id];\n'+
        '\t});\n'+
        '\ttypeof module !== "undefined" ? module.exports = factory.apply(null, deps) : factory.apply(null, deps);\n'+
        '\t}\n'+
        '));';

module.exports = function (grunt) {

    function runUmd () {
        var
            fs = require('fs'),
            config = grunt.config('metl.umd') || {},
            files,
            deps = config.dependencies || [],
            fileName = config.name,
            dir = config.src || './src',
            ordered = config.ordered || [],
            final;

        prefix = prefix.replace('{{DEPS}}', deps.join(', '));
        prefix = prefix.replace('{{DEPSSTR}}', deps.map(function (dep) {
            return '"' + dep + '"';
        }).join(', '));

        final = prefix + '\n';

        function stripIIFE(file, index) {
            var beg = file.search(/\(function\s*\(/),
                end = file.search(/}\s*\(\s*window/);
            if (beg === -1 || end === -1) {
                console.log('WARNING, potential parse problem with file', ordered[index]);
            }
            file = file.substring(0, end);
            file = file.substring(beg);
            file = file.substring(file.indexOf('\n'));
            return file;
        }

        fs.readdirSync(dir).forEach(function (fileName) {
            if (ordered.indexOf(fileName) === -1) {
                ordered.push(fileName);
            }
        });

        files = ordered.map(function (fileName) {
            return fs.readFileSync(dir + '/' + fileName).toString();
        });

        files.forEach(function (file, i) {
            final += stripIIFE(file, i);
        });
        final += suffix;

        try {
            fs.mkdirSync('dist');
        } catch (e) {
            // dir exists
        }
        fs.writeFileSync(fileName, final);
    }

    grunt.registerTask('umd', runUmd);
};