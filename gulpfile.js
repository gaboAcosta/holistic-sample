
var gulp = require('gulp');
require('gulp-import-tasks')('build/gulp/tasks');

// I like my tasks with dots so I added some alias here
gulp.task('docker:down', ['docker-down'])
gulp.task('docker:up', ['docker-up'])

gulp.task('default', [ 'docker-up' ]);