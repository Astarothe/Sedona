//Подключаем модули галпа
var gulp = require("gulp");
var concat = require("gulp-concat");
var autoprefixer = require ("gulp-autoprefixer");
var cleanCSS = require ("gulp-clean-css");
var uglify = require ("gulp-uglify");
var del = require ("del");
var browserSync = require ("browser-sync").create();

var sourcemaps = require ("gulp-sourcemaps");
var less = require ("gulp-less");
var plumber = require ("gulp-plumber");
var webp = require ("gulp-webp");

//Порядок подключения css файлов
var cssFiles = [
  "./src/css/variables.less",
  "./src/css/scaffolding.less",
  "./src/css/header.less",
  "./src/css/page-main.less",
  "./src/css/mainnav.less",
  "./src/css/site-list.less",
  "./src/css/intro.less",
  "./src/css/advantages.less",
  "./src/css/search-hotel.less",
  "./src/css/map.less",
  "./src/css/page-footer.less",
  "./src/css/page-intro.less",
  "./src/css/page-gallery.less",
  "./src/css/page-presentation.less",
  "./src/css/page-video.less",
  "./src/css/intro-form.less",
  "./src/css/page-form.less",
  "./src/css/visited-form.less",
  "./src/css/emotions.less"
]

//Порядок подключения js файлов
var jsFiles = [
  "./src/js/lib.js",
  "./src/js/main.js"
]



//Таск на стили css
function styles() {
  //Шаблон для поиска файлов CSS
  //Всей файлы по шаблону "./src/css/**/*.css"
  return gulp.src(cssFiles)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(less())
  //Обьединение файлов в один
  .pipe(concat("style.css"))
  .pipe(autoprefixer({
    overrideBrowserslist:  ['last 2 versions'],
    cascade: false
  }))
  //Минификация СSS
  .pipe(cleanCSS({
    level: {
      2: {
        all: false,
        removeDuplicateRules: true
      }
    }
  }))
  //Выходная папка для стилей
  .pipe(gulp.dest("./build/css"))
  .pipe(browserSync.stream());
}

gulp.task("webp", function () {
  return gulp.src("HTML-Academy 2 curse/img/**/*/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("HTML-Academy 2 curse/img"));
});

//Таск на скрипты js
function scripts() {
  //Шаблон для поиска файлов js
  //Всей файлы по шаблону "./src/js/**/*.js"
  return gulp.src(jsFiles)
  //Обьединение файлов в один
  .pipe(concat("script.js"))
  //Минификация JS
  .pipe(uglify({
    toplevel:true
  }))
  //Выходная папка для скриптов
  .pipe(gulp.dest("./build/js"))
  .pipe(browserSync.stream());
}

//удалить всё в указанной папке
function clean() {
  return del(["build/*"])
}

//Просматривать файлы
function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  //Следить за less файлами
  gulp.watch("./src/css/**/*.less", styles)
  //Следить за JS файлами
  gulp.watch("./src/js/**/*.js", scripts)
  //При изменении HTML запустить синхронизацию
  gulp.watch("./*.html").on('change', browserSync.reload);
}
//Копирование файлов
gulp.task("copy", function () {
  return gulp.src([
    "HTML-Academy 2 curse/fonts/**/*.{woff,woff2}",
    "HTML-Academy 2 curse/img/**",
    "HTML-Academy 2 curse/js/**"
  ],{
    base:"HTML-Academy 2 curse"
  })
  .pipe(gulp.dest("build"));
});

//Таск вызывающий функция styles
gulp.task("styles",styles);
//Таск вызывающий функцию scripts
gulp.task("scripts",scripts);
//Таск для очистки папки build
gulp.task("del", clean);
//Таск для отслеживания изменений
gulp.task("watch", watch);
//Таск для удаления файлов в папке build и запуск styles и scripts
gulp.task("build", gulp.series(clean, gulp.parallel(styles,scripts)));
//Таск запускает таск build и watch последовательно
gulp.task("dev", gulp.series("build","watch"));
