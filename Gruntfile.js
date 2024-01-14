module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      libraries: {
          files: [
              {
                  expand: true,
                  cwd: 'fonts/',
                  src: ['**/*'],
                  dest: 'dist/fonts/'
              },
              {
                expand: true,
                src: ['manifest.webmanifest', 'icon.png'],
                dest: 'dist/'
              },
              {
                expand: true,
                cwd: 'libs/',
                src: ['**/*'],
                dest: 'dist/'
              }
          ]
      },
      serviceworker: {
        expand: true,
        cwd: 'serviceworker',
        src: 'serviceworker.js',
        dest: '.',
        options: {
          process: content => content.replace(/^const version = '0';/, `const version = '${Date.now()}';`)
        }
      }
    },
    stylus: {
      compile: {
        options: {
          compress: true
        },
        files: {
          'style.css': ['styl/main.styl']
        }
      }
    },
    uglify: {
      default: {
        files: {
          'dist/app.min.js': [ 'dist/app.js', 'dist/handlebars.js' ]
        }
      }
    }, 
    watch: {
      scripts: {
        files: [ "styl/*.styl" ],
        tasks: ['stylus']
      },
      ts: {
        files: [ "src/**/*.ts" ],
        tasks: [ 'ts', 'uglify' ]
      },
      handlebars: {
        files: [ "src/**/*.handlebars" ],
        tasks: [ 'handlebars', 'uglify' ]
      }
    },
    ts: {
      default : {
        tsconfig: './tsconfig.json'
      }
    },
    handlebars: {
      compile: {
        files: {
          'dist/handlebars.js': [ 'src/**/*.handlebars' ]
        }
      }
    },
    svgstore: {
      options: {
        prefix: '',
        formatting: true,
        includeTitleElement: false
      },
      default: {
        files: {
          'dist/icons.svg': [ 'svg/*.svg' ]
        }
      }
    }  
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-handlebars-compiler');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('css', ['stylus']);
  grunt.registerTask('default', ['copy:libraries']);
  grunt.registerTask('typescript', 'ts');
  grunt.registerTask('build', ['copy', 'svgstore', 'stylus', 'ts', 'handlebars', 'uglify']);
  grunt.registerTask('default', ['watch']);

};