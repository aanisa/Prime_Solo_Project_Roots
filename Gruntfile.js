module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      js: {
        expand:true,
        cwd: 'client/scripts/',
        src: ['*.js',
              '**/*.*'],
        dest: 'server/public/assets/scripts/'
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
        src: ['style.css'],
        dest: 'server/public/assets/styles/'
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
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', 'watch']);
};
