if(grunt.config('metl.watch')) {
    var
        port = grunt.config('metl.watch.port') || '35729',
        watchConfig = {};

    if(grunt.config('metl.watch.less')) {
        watchConfig.less = {
            files: grunt.config('metl.watch.less'),
            tasks: ['ls'],
            options: {
                livereload: false //port
            }
        };

        watchConfig.css = {
            files: grunt.config('metl.less.output'),
            tasks: []
        };

        watchConfig.options = {
            livereload: port
        };
    }
    if(grunt.config('metl.watch.scripts')) {
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
        grunt.task.run('build');
        grunt.task.run('less:main');
        grunt.task.run('concurrent:target');
    });
    grunt.event.on('watch', function (action, filepath) {
        console.log('changed.file', action, filepath);
    });
}

//grunt.config('concurrent', {
//    target: {
//        tasks: ['watch', 'serve'],
//        options: {
//            logConcurrentOutput: true
//        }
//    }
//});
//grunt.loadNpmTasks('grunt-contrib-watch');
//grunt.loadNpmTasks('grunt-concurrent');
//grunt.registerTask('dev', function () {
//    grunt.task.run('build');
//    grunt.task.run('less:main');
//    grunt.task.run('concurrent:target');
//});
//grunt.event.on('watch', function (action, filepath) {
//    console.log('changed.file', action, filepath);
//});