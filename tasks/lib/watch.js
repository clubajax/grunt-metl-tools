
module.exports = function (grunt) {

    if (grunt.config('metl.watch')) {
        var
            port = grunt.config('metl.watch.port') || '35729',
            lessFiles = grunt.config('metl.less.output') || grunt.config('metl.less.main.output'),
            watchConfig = {};

        if(!lessFiles){
            console.log('less files not configured in `metl.less.output` nor `metl.less.main.output`');
        }
        if (grunt.config('metl.watch.less')) {
            watchConfig.less = {
                files: grunt.config('metl.watch.less'),
                tasks: ['ls'],
                options: {
                    livereload: false //port
                }
            };

            if(lessFiles) {
                watchConfig.css = {
                    files: lessFiles,
                    tasks: []
                };
            }

            watchConfig.options = {
                livereload: port
            };
        }
        if (grunt.config('metl.watch.scripts')) {
            watchConfig.scripts = {
                files: grunt.config('metl.watch.scripts'),
                options: {
                    livereload: port
                }
            };
        }

        grunt.config('watch', watchConfig);

        grunt.config('concurrent', {
            target: {
                tasks: ['watch', 'serve'],
                options: {
                    logConcurrentOutput: true
                }
            }
        });
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-concurrent');
        grunt.registerTask('dev', function () {
            if(grunt.task.exists('build')) {
                grunt.task.run('build');
            }
            if(lessFiles) {
                grunt.task.run('less:main');
            }
            grunt.task.run('concurrent:target');
        });
        grunt.event.on('watch', function (action, filepath) {
            console.log('changed.file', action, filepath);
        });
    }else{
        console.log('metl.watch not configured');
    }
};