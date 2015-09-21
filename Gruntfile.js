module.exports = function(grunt) {

grunt.initConfig({

    // Project settings
    'config': {

        // Configurable paths
        dev: 'dev',
        dist: 'dist',
        tmp: 'tmp'
    },

    /*
        Connect
        Start a static web server
        https://github.com/gruntjs/grunt-contrib-connect
    */
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
                        connect.static('<%= config.dev %>'),
                    ];
                }
            }
        }
    },

    /*
        Watch
        Run tasks whenever watched files change
        https://www.npmjs.com/package/grunt-contrib-watch
    */
    'watch': {
        css: {
            files: '<%= config.dev %>/assets/scss/*.scss',
            tasks: ['sass:dev']
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                '<%= config.dev %>/{,*/}*.html',
                '<%= config.dev %>/assets/css/{,*/}*',
                '<%= config.dev %>/assets/img/{,*/}*',
                '<%= config.dev %>/assets/js/{,*/}*.js'
            ]
        }
    },

    /*
        Sass
        Compile Sass to CSS
        https://www.npmjs.com/package/grunt-contrib-sass
    */
    'sass': {
        dist: {
            options: {
                style: 'compressed'
            },
            files: {
                '<%= config.dist %>/assets/css/main.css': '<%= config.dev %>/assets/scss/main.scss'
            }
        },
        dev: {
            options: {
                style: 'expanded'
            },
            files: {
                '<%= config.dev %>/assets/css/main.css': '<%= config.dev %>/assets/scss/main.scss'
            }
        }
    },

    /*
        Clean
        Clear files and folders
        https://github.com/gruntjs/grunt-contrib-clean
    */
    'clean': ['<%= config.dist %>', '<%= config.tmp %>'],

    /*
        Copy
        Copy files and folders.
        https://github.com/gruntjs/grunt-contrib-copy
    */
    'copy': {
        main: {
            files: [
            {
                'expand': true,
                'flatten': true,
                'src': ['<%= config.dev %>/favicon.ico'],
                'dest': '<%= config.dist %>/',
                'filter': 'isFile'
            },
            {
                'expand': true,
                'cwd': '<%= config.dev %>/assets/',
                'src': ['**'],
                'dest': '<%= config.dist %>/assets/'
            }
            ]
        },
    },

    /*
        Uglify
        Minify files with UglifyJS
        https://github.com/gruntjs/grunt-contrib-uglify
    */
    'uglify': {
        my_target: {
            files: {
                '<%= config.dist %>/assets/js/main.min.js':
                [
                    '<%= config.dev %>/assets/js/vendors/jquery.js',
                    '<%= config.dev %>/assets/js/vendors/preloadjs.js',
                    '<%= config.dev %>/assets/js/vendors/soundjs.js',
                    '<%= config.dev %>/assets/js/main.js'
                ]
            }
        }
    },

    /*
        Process HTML
        Process html files at build time to modify them depending on the release environment
        https://www.npmjs.com/package/grunt-processhtml
    */
    'processhtml': {
        dist: {
            files: {
                '<%= config.tmp %>/index.html': ['<%= config.dev %>/index.html']
            }
        }
    },

    /*
        HTML Min
        Minify HTML
        https://github.com/gruntjs/grunt-contrib-htmlmin
    */
    'htmlmin': {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: {
                '<%= config.dist %>/index.html': '<%= config.tmp %>/index.html'
            }
        },
    },

    /*
        Cache breaker
        Simple cache-breaker, appends a timestamp or md5 hash to any urls
        https://www.npmjs.com/package/grunt-cache-breaker
    */
    'cachebreaker': {
        dev: {
            options: {
                match: ['main.min.js', 'main.css'],
            },
            files: {
                src: ['<%= config.dist %>/index.html']
            }
        }
    },

    /*
        Bower copy
        Scrupulously manage file locations for bower dependencies.
        https://www.npmjs.com/package/grunt-bowercopy
    */
    'bowercopy': {
        libs: {
            options: {
                destPrefix: '<%= config.dev %>/assets/js/vendors'
            },
            files: {
                'jquery.js': 'jquery/dist/jquery.js',
                'preloadjs.js': 'PreloadJS/lib/preloadjs-0.6.1.min.js',
                'soundjs.js': 'SoundJS/lib/soundjs-0.6.1.min.js',
            }
        }
    },

    /*
        FTP Deploy
        Grunt task for code deployment over ftp
        https://github.com/zonak/grunt-ftp-deploy
    */
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

    /*
        JSHint
        Validate files with JSHint
        https://github.com/gruntjs/grunt-contrib-jshint
    */
    'jshint': {
        options: {
            jshintrc: true
        },
        all: ['Gruntfile.js', '<%= config.dev %>/assets/js/main.js']
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
