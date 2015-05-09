'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      jekyll: {
        files: ['templates/**/*.{html,md,rb,svg,xml,yml,scss}'],
        tasks: ['jekyll:server']
      }
    },
    jekyll: {
      options: {
        src: 'templates'
      },
      dist: {
        options: {
          dest: 'dist',
        }
      },
      server: {
        options: {
          config: 'templates/_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src : [
            '.jekyll/**/*.html',
            '.jekyll/css/**/*.css',
            '.jekyll/js/**/*.js',
            '.jekyll/img/**/*.{gif,jpg,jpeg,png,svg}'
          ]
        },
        options: {
          server: {
            baseDir: ".jekyll"
          },
          watchTask: true
        }
      }
    },
    premailer: {
      simple: {
        options: {},
        files: [{
          expand: true,
          flatten: true,
          src: ['.jekyll/*.html'],
          dest: 'dist/'
        }]
      }
    },
    secret: grunt.file.readJSON('secret.json'),
    mandrill: {
      mailer: {
        options: {
          key: '<%= secret.mandrill.key %>',
          sender: 'noreply@sentr.io',
          recipient: '<%= secret.mandrill.testAddress %>',
          subject: 'This is a test email'
        },
        src: ['.jekyll/*.html']
      }
    }
  });

  grunt.registerTask('default', ['browserSync','watch']);

  grunt.registerTask('build', [
    'jekyll:dist'
  ]);

  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-premailer');
  grunt.loadNpmTasks('grunt-mandrill');
};
