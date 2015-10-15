module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    eslint: {
      target: [
        'client/src/**/*.es6',
      ]
    },
    // mochaTest: {
    //   test: {
    //     options: {
    //       reporter: 'spec'
    //     },
    //     src: ['test/**/*.js']
    //   }
    // },
    babel: {
      es6: {
        files: [
          {
            expand: true,
            src: ['client/src/js/**/*.es6'],
            ext: '.js'
          }
        ]
      }
    },
    browserify: {
      options: {},
      dist: {
        src: ['client/src/**/*.js'],
        dest: 'client/dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'client/dist/js/<%= pkg.name %>.min.js': ['<%= browserify.dist.dest %>']
        }
      }
    },
    sass: {
      dist: {
        files: {
          'client/dist/css/<%= pkg.name %>.css': 'client/src/sass/style.scss'
        }  
      }
    },
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      dist: {
        files: {
          'client/dist/css/<%= pkg.name %>.min.css': 'client/dist/css/<%= pkg.name %>.css'
        }
      }
    },

    watch: {
      sasswatch: {
        files: 'client/src/**/*.scss',
        tasks: [ 
          'sass',
          'cssmin'
        ],
        options: {
          livereload: true
        }
      },
      scripts: {
        options: {
          livereload: true
        },
        files: [
          'client/src/**/*.es6'
        ],
        tasks: [
          'babel',
          'browserify',
          'uglify'
        ]
      }
      
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-babel');
  // grunt.loadNpmTasks('grunt-mocha-test');


  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint'
  //   'mochaTest'
  ]);

  grunt.registerTask('build', [
    'babel',
    'browserify',
    'uglify',
    'sass',
    'cssmin'
  ]);

  grunt.registerTask('deploy', [
    'test',
    'build',
  ]);
};
