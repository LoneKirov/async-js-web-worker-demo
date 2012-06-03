requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    },
    packages: [{name: 'uglify-js', main: 'uglify-js', location: 'uglify-js'}]
});

requirejs(['app/demo', 'uglify-js'], function(demo, uglify) {
});
