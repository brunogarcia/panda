module.exports = function(grunt) {

grunt.initConfig({

    'sass': {
        dist: {
            options: {
                style: 'compressed'
            },
            files: {
                'dist/assets/css/main.css': 'dev/assets/scss/main.scss'
            }
        },
        dev: {
            options: {
                style: 'expanded'
            },
            files: {
                'dev/assets/css/main.css': 'dev/assets/scss/main.scss'
            }
        }
    },

    'watch': {
        css: {
            files: 'dev/assets/scss/*.scss',
            tasks: ['sass:dev']
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                'dev/{,*/}*.html',
                'dev/assets/css/{,*/}*',
                'dev/assets/img/{,*/}*',
                'dev/assets/js/{,*/}*.js'
            ]
        }
    },

    'connect': {
        options: {
            port: 9000,
            open: true,
            livereload: 35729,
            hostname: 'localhost'
        },
        livereload: {
            options: {
                middleware: function(connect) {
                    return [
                        connect.static('dev'),
                    ];
                }
            }
        }
    },

    'uglify': {
        my_target: {
            files: {
                'dist/assets/js/main.min.js':
                [
                    'dev/assets/js/vendors/jquery.js',
                    'dev/assets/js/vendors/preloadjs.js',
                    'dev/assets/js/vendors/soundjs.js',
                    'dev/assets/js/main.js'
                ]
            }
        }
    },

    'htmlmin': {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: {
                'dist/index.html': 'tmp/index.html'
            }
        },
    },

    'copy': {
        main: {
            files: [
            {
                'expand': true,
                'flatten': true,
                'src': ['dev/favicon.ico'],
                'dest': 'dist/',
                'filter': 'isFile'
            },
            {
                'expand': true,
                'cwd': 'dev/assets/',
                'src': ['**'],
                'dest': 'dist/assets/'
            }
            ]
        },
    },

    'processhtml': {
        dist: {
            files: {
                'tmp/index.html': ['dev/index.html']
            }
        }
    },

    'clean': ['tmp', 'dist'],

    'cachebreaker': {
        dev: {
            options: {
                match: ['main.min.js', 'main.css'],
            },
            files: {
                src: ['dist/index.html']
            }
        }
    },

    'bowercopy': {
        libs: {
            options: {
                destPrefix: 'dev/assets/js/vendors'
            },
            files: {
                'jquery.js': 'jquery/dist/jquery.js',
                'preloadjs.js': 'PreloadJS/lib/preloadjs-0.6.1.min.js',
                'soundjs.js': 'SoundJS/lib/soundjs-0.6.1.min.js',
            }
        }
    },

    'ftp-deploy': {
        build: {
            auth: {
                host: 'ftp.evasantos.com',
                port: 21,
                authKey: 'evasantos'
            },
            src: 'dist',
            dest: 'ilustraciones',
            exclusions: [
                '/scss/*.*'
            ]
        }
    },

    'jshint': {
        options: {
            jshintrc: true
        },
        all: ['Gruntfile.js', 'dev/assets/js/main.js']
    }

});

// Dev tasks
grunt.loadNpmTasks('grunt-bowercopy');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-sass');

// Dist tasks
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-processhtml');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-cache-breaker');
grunt.loadNpmTasks('grunt-ftp-deploy');

// JS Hint
grunt.loadNpmTasks('grunt-contrib-jshint');

// Development
grunt.registerTask('default', ['connect:livereload', 'watch']);

// Distribution
grunt.registerTask('dist', ['clean', 'copy', 'uglify', 'processhtml', 'htmlmin:dist', 'sass:dist', 'cachebreaker']);

// FTP
grunt.registerTask('ftp', ['dist', 'ftp-deploy']);

};
