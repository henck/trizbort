module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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

  // Default task(s).
  grunt.registerTask('css', ['stylus']);
  grunt.registerTask('typescript', 'ts');
  grunt.registerTask('build', ['stylus', 'ts', 'handlebars', 'uglify']);
  grunt.registerTask('default', ['watch']);
  

};