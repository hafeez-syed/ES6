/**
 * Created by Hafeez Syed on 27/05/2016.
 */
/*
 Gulp tasks for es6Rapid
 */

/*
 Gulp load plugins will load all plugins that begin with 'gulp-'
 It stores them in the plugins object, removes the gulp prefix and
 camel cases them eg. gulp-svg-sprites becomes plugins.svgSprites
 */
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

/*
 Require other packages here, this is anything not prexfixed with 'gulp-'
 */
var del = require('del'),
    lazypipe = require('lazypipe'),
    stylish = require('jshint-stylish'),
    runSequence = require('run-sequence'),
    notification = require('node-notifier'),
    merge = require('merge-stream'),
    browserSync = require('browser-sync'),
    fs = require('fs'),
    path = require('path'),
    esdoc = require('gulp-esdoc');

/*
 Vars used throughout the task as Gulp does not support passing vars between tasks
 */

var doUglify = false,
    sourcemaps = true;

/*
 Project setup vars
 */
var es6Rapid = {
        src: 'src',
        dist: 'dist',
        tests: 'tests',
        docs: 'docs'
    },
    paths = {
        js: {
            filename: 'es6Rapid',
            src: es6Rapid.src + '/js/',
            dist: es6Rapid.dist + '/js/',
            docs: es6Rapid.docs + '/js/'
        },
        css: {
            srcFilename: 'screen',
            distFilename: 'es6Rapid',
            src: es6Rapid.src + '/css/',
            dist: es6Rapid.dist + '/css/',
            docs: es6Rapid.docs + '/css/'
        },
        images: {
            src: es6Rapid.src + '/images/',
            dist: es6Rapid.dist + '/images/'
        },
        fonts: {
            dist: es6Rapid.dist + '/fonts/'
        },
        icons: {
            src: es6Rapid.src + '/icons/',
        },
        svg: {
            src: es6Rapid.src + '/svg/',
            dist: es6Rapid.dist + '/svg/'
        },
        views: {
            dist: es6Rapid.dist + '/views/',
            interfaceTemplates: '../interfaceTemplates/'
        },
        bower: {
            src: 'bower_components/'
        },
        test: {
            visual: 'test/visual/',
            unit: 'test/unit/'
        }
    },
    commonJS = [ // JS that is bundled into the main es6Rapid.js file
        paths.js.src + 'app.js',
        paths.js.src + 'common/*.js',
        paths.js.src + 'services/*.js',
        paths.js.src + 'activity/*.js',
        paths.js.src + 'panes/*.js',
        paths.js.src + 'jq/clockin.js'
    ],
    angularTemplates = [ // Folders of templates to be compiled into JS files
        'activity',
        'common',
        'panes',
        'events'
    ],
    jsPackages = [ // Bundles of js files, for example, 'training' takes all js in the training folder and creates es6Rapid-training.js
        'training',
        'newsfeed',
        'onboarding',
        'support',
        'profile',
        'libraries',
        'events',
        'formbuilder'
    ];


// Handle the showing of notifications for errors and good things
function handleNotification(message) {
    console.log(message.toString());

    var notifier = new notification();
    notifier.notify({
        message: message.toString()
    });

    if (typeof this.emit === 'function') this.emit('end');

    /*
     Gulp notify - example of notifcation in pipe
     .pipe(plugins.notify({ message: 'Styles task complete' }));
     */
}


/*
 Tasks
 */

gulp.task('set-deploy-vars', function(){
    doUglify = true;
    sourcemaps = false;
});

//Clean entire dist directory
gulp.task('deploy-clean', function(cb){
    return del([
        es6Rapid.dist + '/css/**',
        es6Rapid.dist + '/fonts/**',
        es6Rapid.dist + '/images/**',
        es6Rapid.dist + '/js/**',
        es6Rapid.dist + '/views/**',
        es6Rapid.dist + '/svg/**',
        es6Rapid.docs + '/**'
    ], {force: true}, cb);
});

gulp.task('default-clean', function(cb){

    return del([
        es6Rapid.dist + '/app.manifest',
        paths.js.dist + '**'
    ], {force: true}, cb);
});

// Basic stylus compile
gulp.task('stylus', function (){
    return gulp.src(paths.css.src + paths.css.srcFilename + '.styl')
        .pipe(plugins.newer(paths.css.dist + paths.css.filename + '.css'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.stylus())
        .on('error', handleNotification)
        .pipe(plugins.rename(function (path) {
            path.basename = path.basename.replace(paths.css.srcFilename, paths.css.distFilename)
        }))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css.dist));
});

// Deploy stylus files, build all colour variations and apply minifcation and prefixing
gulp.task('stylus-deploy', function (){
    return gulp.src(paths.css.src + paths.css.srcFilename + '**')
        .pipe(plugins.stylus())
        .on('error', handleNotification)
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', '> 0.5% in AU', 'ie 9'],
            cascade: false
        }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(function (path) {
            path.basename = path.basename.replace(paths.css.srcFilename, paths.css.distFilename)
        }))
        .pipe(gulp.dest(paths.css.dist));
});

gulp.task('iconfont', function(){
    return gulp.src(paths.icons.src + '**/*.svg')
        .pipe(plugins.iconfont({
            fontName: 'es6Rapid',
            normalize: true,
            startCodepoint: 0xE601
        }))
        .on('codepoints', function(codepoints, options) {

            gulp.src(paths.css.src + 'elements/icons-template.tmpl')
                .pipe(plugins.consolidate('lodash', {
                    glyphs: codepoints,
                    className: 'icon--'
                }))
                .pipe(plugins.rename('icons.styl'))
                .pipe(gulp.dest(paths.css.src + 'elements/'));

            gulp.src(paths.css.src + 'elements/markup/icons.tmpl')
                .pipe(plugins.consolidate('lodash', {
                    glyphs: codepoints,
                    className: 'icon--'
                }))
                .pipe(plugins.rename('icons.hbs'))
                .pipe(gulp.dest(paths.css.src + 'elements/markup/'));
        })
        .pipe(gulp.dest(paths.fonts.dist));
});

// Generate SVG sprites for all svgs in the svg src folder
gulp.task('svg-sprite', function () {

    var filterStylus = plugins.filter('svg-sprite.styl');
    var filterSVG = plugins.filter('sprite.svg');

    return gulp.src(paths.svg.src + '/*.svg')
        .pipe(plugins.svgSprites({
            cssFile: 'svg-sprite.styl',
            svg: {
                sprite: "sprite.svg"
            },
            svgPath: '../svg/sprite.svg',
            selector: "iconSVG-%f",
            preview: false
        }))
        .pipe(filterStylus)
        .pipe(gulp.dest(paths.css.src + 'elements/'))
        .pipe(filterStylus.restore())
        .pipe(filterSVG)
        .pipe(plugins.svgmin())
        .pipe(gulp.dest(paths.svg.dist));
});

// Compress images
gulp.task('image-compression', function () {
    return gulp.src(paths.images.src + '**/*')
        .pipe(plugins.newer(paths.images.dist))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(paths.images.dist));
});

/*
 JS Tasks
 */

// Streams shared amongst JS tasks
function buildJSConcat(fileNameSuffix, runJSHint, doUglify, sourcemaps) {
    return lazypipe()
        .pipe(function() {
            return plugins.if(sourcemaps, plugins.sourcemaps.init());
        })
        .pipe(plugins.newer, paths.js.dist + paths.js.filename + fileNameSuffix + '.js')
        .pipe(function() { // Unfortunately we can't use just one if statement hence the messy code
            return plugins.if(runJSHint, plugins.jshint('.jshintrc'));
        })
        .pipe(function() {
            return plugins.if(runJSHint, plugins.jshint.reporter(stylish));
        })
        /*.pipe(function() {
         return plugins.if(runJSHint, plugins.jshint.reporter('fail')); // Make the task fail if it has errors, currently breaks watch
         })*/
        .pipe(plugins.concat, paths.js.filename + fileNameSuffix + '.js')
        .pipe(plugins.ngAnnotate) // Prevent angular from being mangled during minifcation
        .pipe(function() {
            return plugins.if(doUglify, plugins.uglify({preserveComments: 'some'}));
        })
        .pipe(function() {
            return plugins.if(sourcemaps, plugins.sourcemaps.write('./'));
        })
        .pipe(function() {
            return plugins.if(!runJSHint, gulp.dest(paths.js.dist));
        })
}

function buildJSSingle(fileFolder, sourcemaps, doUglify) {
    return lazypipe()
        .pipe(function() {
            return plugins.if(sourcemaps, plugins.sourcemaps.init());
        })
        .pipe(plugins.newer, paths.js.dist + fileFolder + '/')
        .pipe(function() {
            return plugins.if(doUglify, plugins.uglify({preserveComments: 'some'}));
        })
        .pipe(function() {
            return plugins.if(sourcemaps, plugins.sourcemaps.write('./'));
        })
        .pipe(gulp.dest, paths.js.dist + fileFolder + '/');
}

gulp.task('build-js', function(){

    var lib = gulp.src([
        paths.bower.src + 'angular/angular.js',
        paths.bower.src + 'angular-animate/angular-animate.js',
        paths.bower.src + 'angular-cache/dist/angular-cache.js',
        paths.bower.src + 'angular-resource/angular-resource.js',
        paths.bower.src + 'angular-cookies/angular-cookies.js',
        paths.bower.src + 'angular-route/angular-route.js',
        paths.bower.src + 'angular-cookies/angular-cookies.js',
        'node_modules/angular-sanitize/angular-sanitize.js', //Old versions removed from bower repo :(
        paths.bower.src + 'angular-load/angular-load.js',
        paths.bower.src + 'ng-sortable/dist/ng-sortable.js',
        //paths.bower.src + 'moment/moment.js',
        'node_modules/angular-moment/node_modules/moment/moment.js',
        paths.bower.src + 'moment-timezone/moment-timezone.js',
        paths.bower.src + 'Sortable/Sortable.js',
        paths.bower.src + 'textAngular/src/textAngular.js',
        paths.bower.src + 'ng-material-floating-button/src/mfb-directive.js',
        paths.bower.src + 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
        paths.bower.src + 'ng-scrollbars/src/scrollbars.js',
        'node_modules/angular-moment/angular-moment.js',

        paths.js.src + 'lib/*.js' // This is anything we don't manage with Bower
    ]).pipe(buildJSConcat('-lib', false, doUglify, sourcemaps)()); // Don't process these files with jshint

    // Assets we don't want to concatentate
    var jquery = gulp.src(paths.bower.src + 'jquery/dist/jquery.js').pipe(buildJSSingle('jq', sourcemaps, doUglify)());
    var respond = gulp.src(paths.bower.src + 'respond/src/respond.js').pipe(buildJSSingle('polyfill', sourcemaps, doUglify)());
    var moxie = gulp.src(paths.bower.src + 'moxie/bin/js/moxie.js').pipe(buildJSSingle('polyfill', sourcemaps, doUglify)());
    var moxie2 = gulp.src(paths.bower.src + 'moxie/bin/flash/moxie.min.swf').pipe(gulp.dest(paths.js.dist + 'polyfill/'));
    var xdomain = gulp.src(paths.bower.src + 'xdomain/dist/xdomain.js').pipe(buildJSSingle('polyfill', sourcemaps, doUglify)());
    var d3 = gulp.src(paths.bower.src + 'd3/d3.js').pipe(buildJSSingle('lib', sourcemaps, doUglify)());
    var unsupportedBrowser = gulp.src(paths.js.src + 'jq/unsupported-browser.js').pipe(buildJSSingle('jq', sourcemaps, doUglify)());

    // Build assets in commonJS array, bundle as es6Rapid.js
    var common = gulp.src(commonJS)
        .pipe(buildJSConcat('', true, doUglify, sourcemaps)())
        .on('error', handleNotification)
        .pipe(gulp.dest(paths.js.dist));

    // TODO - could move these into a subfolder and automate this to take any folder
    var jsPackagePipes = [];

    for (i = 0; i < jsPackages.length; i++) {
        jsPackagePipes[i] = gulp.src(paths.js.src + jsPackages[i] + '/*.js')
            .pipe(buildJSConcat('-' + jsPackages[i], true, doUglify, sourcemaps)())
            .on('error', handleNotification)
            .pipe(gulp.dest(paths.js.dist));
    }

    // Returning a merged stream will ensure these are all executed before returning however this has a large speed impact
    return merge(lib, jquery, respond, moxie, moxie2, d3, unsupportedBrowser, common, xdomain, jsPackagePipes)
});

function getFoldersWithPartials(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            // existsSync has been deprecated.  If it is removed, have a look into is-there instead.
            // is there was not working correctly at the time this was written which is why it wasn't used in the first place.
            // https://github.com/IonicaBizau/node-is-there
            return fs.existsSync(path.join(dir, file) + '\\templates\\partials', function (exists) {
                return fs.statSync(path.join(dir, file)).isDirectory();
            });
        });
}

function createNGTemplates(templateFolder) {
    return lazypipe()
        .pipe(plugins.angularTemplatecache, {
            filename: 'z_ng-templates-combined.js',
            module: 'es6Rapid',
            root:  '/interface/views/' + templateFolder + '/partials/'
        })
        .pipe(gulp.dest, paths.js.src + templateFolder);
}

gulp.task('create-ng-templates', function(){

    var streams = [];
    var foldersWithPartials = getFoldersWithPartials(paths.js.src);

    for (i = 0; i < foldersWithPartials.length; i++) {
        streams[i] = gulp.src([paths.js.src + foldersWithPartials[i] + '/templates/partials/*.html'])
            .pipe(createNGTemplates(foldersWithPartials[i])());
    }
    return merge(streams);
});

gulp.task('clean-ng-templates', function(cb){

    return del(paths.js.src + '**/*ng-templates-combined.js', {force: false}, cb);
});

gulp.task('views-copy', function(){

    return gulp.src(paths.js.src + '**/templates/**/*')
        .pipe(plugins.rename(function (path) {
            path.dirname = path.dirname.replace('\\templates', '');
        }))
        .pipe(gulp.dest(paths.views.dist));
});

gulp.task('views-copy-deploy', function(){

    // Return only the base level views and not the partials and also the form json structures
    return gulp.src([
        paths.js.src + '**/templates/*.html',
        paths.js.src + '**/templates/form-data/**'
    ]).pipe(plugins.rename(function (path) {
        path.dirname = path.dirname.replace('\\templates', '');
    }))
        .pipe(gulp.dest(paths.views.dist));
});

gulp.task('images-copy', function(){

    return gulp.src(paths.images.src + '**/*')
        .pipe(gulp.dest(paths.images.dist));
});

gulp.task('fonts-copy', function(){

    return gulp.src(paths.fonts.src + '**/*')
        .pipe(gulp.dest(paths.fonts.dist));
});

gulp.task('svg-sprite-copy', function(){

    return gulp.src(paths.svg.src + 'sprite.svg')
        .pipe(plugins.svgmin())
        .pipe(gulp.dest(paths.svg.dist));
});

// Creation of a cache manifest file
gulp.task('create-manifest', function(){

    gulp.src([
        es6Rapid.dist + '/**',
        '!' + es6Rapid.dist + '/**/*.map',
        '!' + es6Rapid.dist + '/media/**',
    ])
        .pipe(plugins.rename(function (path) {
            path.dirname = '/interface/' + path.dirname;
        }))
        .pipe(plugins.manifest({
            timestamp: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'app.manifest'
        }))
        .pipe(plugins.replace('interface/', '/interface/')) // Add in leading slash
        .pipe(gulp.dest(es6Rapid.dist));
});

gulp.task('docs-copy-old', function(){

    var images = gulp.src(paths.images.src + '**').pipe(gulp.dest('docs-old/interface/images'));
    var fonts = gulp.src(paths.fonts.dist + '**').pipe(gulp.dest('docs-old/interface/fonts'));
    var svg = gulp.src(paths.svg.src + '**').pipe(gulp.dest('docs-old/interface/svg'));
    var js = gulp.src(paths.js.dist + '**').pipe(gulp.dest('docs-old/interface/js'));
    var css = gulp.src(paths.css.dist + '**').pipe(gulp.dest('docs-old/interface/css'));

    var views = gulp.src(paths.js.src + '**/templates/**')
        .pipe(plugins.rename(function (path) {
            path.dirname  = path.dirname.replace('\\templates', '');
        }))
        .pipe(gulp.dest('docs-old/interface/views'));

    // Returning a merged stream will ensure these are all executed before return however this has a large speed impact
    //return merge(images, fonts, svg, js, css, views);
});

// Start the old docs server
gulp.task('docs-server-old', ['docs-copy-old'], function() {
    plugins.connect.server({
        root: 'docs-old',
        port: 3001
    });
    gulp.src('./index.html')
        .pipe(plugins.open("", {app: "chrome", url: "http://localhost:3001"}));
});

// gulp
gulp.task('docs-clean', function(){
    return del(es6Rapid.docs + '/*.html')
});

// Build our docs from stylus files
gulp.task('docs-compile', plugins.shell.task([
    'kss-node ../../../src/css ../../../docs --template ../../../docs/_template'
], {cwd: 'node_modules/kss/bin/'}));

// Copy interface files to docs folder
gulp.task('docs-copy', function(){

    var images = gulp.src(paths.images.src + '**').pipe(gulp.dest(es6Rapid.docs + '/interface/images'));
    var fonts = gulp.src(paths.fonts.dist + '**').pipe(gulp.dest(es6Rapid.docs + '/interface/fonts'));
    var svg = gulp.src(paths.svg.src + '**').pipe(gulp.dest(es6Rapid.docs + '/interface/svg'));
    var js = gulp.src(paths.js.dist + '**').pipe(gulp.dest(es6Rapid.docs + '/interface/js'));
    var css = gulp.src(paths.css.dist + '**').pipe(gulp.dest(es6Rapid.docs + '/interface/css'));

    var views = gulp.src(paths.js.src + '**/templates/**')
        .pipe(plugins.rename(function (path) {
            path.dirname  = path.dirname.replace('\\templates', '');
        }))
        .pipe(gulp.dest(es6Rapid.docs + '/interface/views'));

    // Returning a merged stream will ensure these are all executed before return however this has a large speed impact
    return merge(images, fonts, svg, js, css, views);
});

// Start the docs server
gulp.task('docs-server', function() {
    plugins.connect.server({
        root: es6Rapid.docs,
        port: 3000
    });
    gulp.src('./index.html')
        .pipe(plugins.open("", {app: "chrome", url: "http://localhost:3000"}));
});

gulp.task('docs-rebuild', function(){
    return runSequence('docs-compile', 'docs-copy');
})

gulp.task('docs-start', function(){
    return runSequence('docs-compile', 'docs-copy', 'docs-server');
})

// Start browser sync server
gulp.task('browser-sync', function() {
    browserSync({
        proxy: {
            host: 'localhost',
            port: 10015
        },
        port: 4000,
        ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        }
    });

    handleNotification('Browser sync is ready');
});

// Rerun tasks when src files change
gulp.task('watch', function(){

    plugins.livereload.listen(); // Start livereload server

    gulp.watch(paths.css.src + '**/*.styl', function(){
        runSequence('stylus', 'docs-rebuild');
    });

    gulp.watch(paths.icons.src + '**/*.svg', function(){
        runSequence('iconfont');
    });

    gulp.watch(paths.images.src + '**', function(){
        runSequence('images-copy', 'docs-copy');
    });

    gulp.watch(paths.svg.src + 'sprite.svg', function(){
        runSequence('svg-sprite-copy', 'docs-copy');
    });

    // All src JS
    gulp.watch([
        paths.bower.src + '**/*.js',
        paths.js.src + '**/*.js'
    ], function(){
        runSequence('build-js', 'docs-copy');
    });

    // Views
    gulp.watch([
        paths.js.src + '**/*.html',
        paths.js.src + '**/*.json'
    ], function(){
        runSequence('views-copy', 'docs-copy');
    });

    // Docs
    gulp.watch(es6Rapid.docs + '/_template/**', function(){
        runSequence('stylus', 'docs-rebuild');
    });

    // The other watch tasks will trigger a change to the dist path, watch for it here
    gulp.watch([
        paths.css.dist + '**/*.css',
        paths.js.dist + '**/*.js',
        paths.js.src + '**/*.html', // Watch src instead to avoid multiple reloads from taking place
        paths.js.src + '**/*.json',
        paths.svg.dist + '*.svg',
        paths.images.dist + '**',
        paths.views.interfaceTemplates + '**',
        es6Rapid.docs + '**/*.js'
    ]).on('change', function(file) {
        setTimeout(function(){ // Allow time for the copy task to finish
            plugins.livereload.changed(file);
            browserSync.reload();
        }, 1000);
    });

    handleNotification('Watching for changes');
});

// When running regular gulp, ignore all files in the interface folder
// Git ignore only ignores new files so also do a assume unchanaged so that they aren't marked as changed
gulp.task('add-git-ignore', function(){

    return gulp.src(es6Rapid.dist)
        .pipe(plugins.file('.gitignore', '*'))
        .pipe(gulp.dest(es6Rapid.dist))
});

gulp.task('ignore-interface-files', ['add-git-ignore'], plugins.shell.task([
    'git ls-files -z | xargs -0 git update-index --assume-unchanged'
], {cwd: '../interface'}));

// Reverse the git ignore
gulp.task('remove-git-ignore', function(){
    return del(es6Rapid.dist + '/.gitignore', {force: true});
});

gulp.task('unignore-interface-files', ['remove-git-ignore'], plugins.shell.task([
    'git ls-files -z | xargs -0 git update-index --no-assume-unchanged'
], {cwd: '../interface'}));

gulp.task('start-storage-emulator', plugins.shell.task([
    'csrun.exe /devstore:start'
], {cwd: 'C:\\Program Files\\Microsoft SDKs\\Azure\\Emulator\\'}));

// Perform a single run of the unit tests
gulp.task('run-unit-tests', plugins.shell.task([
    'karma start test/karma.conf.js  --single-run'
]));

// Run a bower update
gulp.task('bower-update', function() {
    return plugins.bower({ cmd: 'update'});
});

/*
 * UI testing
 */

function buildUITests(filenames, bundleName) {
    var files = [];
    files.push(paths.test.visual + '_partials/header.js');
    filenames.forEach(function(item){
        files.push(paths.test.visual + '_partials/' + item + '.js');
    });
    files.push(paths.test.visual + '_partials/footer.js');
    return gulp.src(files)
        .pipe(plugins.concat(bundleName + '.js'))
        .pipe(gulp.dest(paths.test.visual));
}

gulp.task('build-ui-tests', function(){

    var dashboard = buildUITests(['dashboard'], 'dashboard');
    var latestNews = buildUITests(['latest-news'], 'latest-news');
    var directory = buildUITests(['directory'], 'directory');
    var training = buildUITests(['training'], 'training');
    var all = buildUITests(['dashboard', 'latest-news', 'directory', 'training'], 'all');

    return merge(dashboard, latestNews, directory, training, all);
});

gulp.task('run-ui-tests', ['build-ui-tests'], plugins.shell.task(['casperjs.bat test ../all.js'], {cwd: 'test/visual/PhantomCSS'}));
gulp.task('run-ui-test-dashboard', ['build-ui-tests'], plugins.shell.task(['casperjs.bat test ../dashboard.js'], {cwd: 'test/visual/PhantomCSS'}));
gulp.task('run-ui-test-latest-news', ['build-ui-tests'], plugins.shell.task(['casperjs.bat test ../latest-news.js'], {cwd: 'test/visual/PhantomCSS'}));
gulp.task('run-ui-test-directory', ['build-ui-tests'], plugins.shell.task(['casperjs.bat test ../directory.js'], {cwd: 'test/visual/PhantomCSS'}));
gulp.task('run-ui-test-training', ['build-ui-tests'], plugins.shell.task(['casperjs.bat test ../training.js'], {cwd: 'test/visual/PhantomCSS'}));

/*
 *  Primary gulp tasks
 */

// Default Gulp task
gulp.task('default', function(){
    runSequence('default-clean', ['ignore-interface-files', 'build-js', 'stylus', 'views-copy', 'docs-start', 'start-storage-emulator'], 'watch');
});

// Start a watch with browser-sync enabled
gulp.task('watch-bs', function(){
    runSequence('watch', 'browser-sync');
});

// Run regular gulp with browser-sync included
gulp.task('with-bw', ['default'], function(){
    runSequence('browser-sync');
});

// Deploy gulp task to run when commiting and deploying code
gulp.task('deploy', ['deploy-clean'], function(){
    runSequence('set-deploy-vars', 'bower-update', 'iconfont', ['unignore-interface-files', 'stylus-deploy', 'image-compression', 'fonts-copy', 'views-copy-deploy', 'svg-sprite-copy'], 'create-ng-templates', 'build-js', 'clean-ng-templates','docs-copy', 'create-manifest', 'notify-deploy');
});

// Same as the gulp deploy task but doesn't run unit tests or do any git ignore / unignore changes.  Use this task on the build server
gulp.task('build', ['deploy-clean'], function(){
    runSequence('set-deploy-vars', 'bower-update', 'iconfont', ['unignore-interface-files', 'stylus-deploy', 'image-compression', 'fonts-copy', 'views-copy-deploy', 'svg-sprite-copy'], 'create-ng-templates', 'build-js', 'clean-ng-templates', 'docs-copy', 'create-manifest', 'notify-deploy');
});

gulp.task('notify-deploy', function(){
    handleNotification('Gulp deploy is complete');
});