module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        less: {
          development: {
            options: {
              compress: true,
              yuicompress: false,
              optimization: 2
            },
            files: {
              "css/ds-test.css": "less/ds-test.less" // destination file and source file
            }
          }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'css/ds-test.css'
            }
        },
        watch: {
          styles: {
            files: ['less/*.less'], // which files to watch
            tasks: ['less', 'postcss:dist'],
            options: {
              nospawn: true
            }
          }
        }

    });
    grunt.registerTask('default', ['less', 'postcss:dist', 'watch']);

};
