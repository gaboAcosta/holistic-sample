
var gulp = require('gulp');
require('gulp-import-tasks')('build/gulp/tasks');

gulp.task('logs', ['docker-logs'])
gulp.task('command', ['docker-command'])
gulp.task('down', ['docker-down'])
gulp.task('up', ['docker-up'])
gulp.task('build', ['docker-build'])
gulp.task('test', ['docker-test'])

gulp.task('default', [ 'docker:up', 'docker:logs' ]);