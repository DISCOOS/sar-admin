'use strict';

module.export = function(){

    var gulp = require('gulp');
    var gulpNgConfig = require('gulp-ng-config');

    var shared = path.join('src','app','shared','config');
	var src = shared + '.json';

    // Get overridable config values
    const override = require(shared + '.js')(src);

    var configureSetup  = {
          createModule: false,
          constants: override
    };

    // Generate config file
    gulp.task('config', function() {
      gulp.src(src)
          .pipe(gulpNgConfig('CONFIG', configureSetup))
          .pipe(gulp.dest('dist'));
    });
    
    return gulp;
}