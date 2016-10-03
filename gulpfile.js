var gulp    = require('gulp'),
    sass    = require("gulp-sass"),
    concat  = require("gulp-concat"),
    plumber = require("gulp-plumber");

// web_doc_base.scss の変更を監視してコピー
gulp.task('copy', function() {
  return gulp.src('../WebDocBase/web_doc_base.scss')
    .pipe(plumber())
    .pipe(gulp.dest('./scss/00_Lib/'));
});

// それぞれのプラグインで行う処理を書いていく
gulp.task('concat', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber())
    .pipe(concat('blogspot_base.scss'))
    .pipe(gulp.dest('./'));
});

// エラーがないか？だけを確認 css は作らない
gulp.task('test-build', function() {
    gulp.src('blogger_base.scss')
        .pipe(plumber())
        .pipe(sass());
        // .pipe(gulp.dest("./"));
});

// ファイルを監視して実行させる
// gulpコマンドで実行できるように、タスク名をdefaultに変更
gulp.task('default', function() {
  gulp.watch(['../WebDocBase/web_doc_base.scss'], ['copy']);
  gulp.watch(['scss/**/*.scss'], ['concat', 'test-build']);
});