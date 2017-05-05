module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      js: {
        expand:true,
        cwd: 'client/scripts/',
        src: ['*.js',
              '**/*.*'],
        dest: 'server/public/scripts/'
      },
      html: {
        expand: true,
        cwd: 'client/views',
        src: ['index.html',
              '**/*.*'],
        dest: 'server/public/views/'
      },
      css: {
        expand: true,
        cwd: 'client/styles',
        src: ['*.css',
              '**/*.*'],
        dest: 'server/public/styles/'
      },
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: ['css/bootstrap.min.css',
              'css/bootstrap.min.css.map',
              'fonts/*.*',
              'js/bootstrap.min.js'],
        dest: 'server/public/vendors/bootstrap/'
      },
      angular: {
        expand: true,
        cwd: 'node_modules/angular/',
        src: ['angular.js',
              'angular.min.js',
              'angular.min.js.map'],
        dest: 'server/public/vendors/angular/'
      },
      angularRoute: {
        expand: true,
        cwd: 'node_modules/angular-route/',
        src: ['angular-route.js',
              'angular-route.min.js',
              'angular-route.min.js.map'],
        dest: 'server/public/vendors/angular-route/'
      },
      momentJS: {
        expand: true,
        cwd: 'node_modules/moment/min/',
        src: ['moment.min.js'],
        dest: 'server/public/vendors/moment/'
      },
      angularCSS: {
        expand: true,
        cwd: 'node_modules/angular-css/',
        src: ['angular-css.min.js'],
        dest: 'server/public/vendors/angular-css/'
      },
      d3: {
        expand: true,
        cwd: 'node_modules/d3/build/',
        src: ['d3.min.js'],
        dest: 'server/public/vendors/d3/'
      },
      d3Hierarchy: {
        expand: true,
        cwd: 'node_modules/d3-hierarchy/build/',
        src: ['d3-hierarchy.min.js'],
        dest: 'server/public/vendors/d3-hierarchy/'
      },
    },
    imagemin: {
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
          expand: true,
          cwd: 'client/images/',
          src: ['*.jpg'],
          dest: 'server/public/images/',
          ext: '.jpg'
        }
        ]
      }
    },
    watch: {
      files: [
        'client/**/*.*'
      ],
      tasks: ['copy']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', 'imagemin', 'watch']);
};
