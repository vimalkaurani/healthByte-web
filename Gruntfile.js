module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cachebreaker: {
            dev: {
                options: {
                    match: ['app.js', 'app.factory.js','assets/js/service.js','assets/js/custom.js','views/content/compose.js','views/content/content.controller.js','views/content/guidelines.js','views/content/share.js','views/user/user.controller.js','views/list/list.controller.js','views/insights/insights.controller.js','views/invite/invite.controller.js','views/admin/invite.controller.js'],
                },
                files: {
                    src: ['app/index.html']
                }
            }
        }
    });

    //grunt.loadNpmTasks('grunt-cache-breaker');

    //grunt.registerTask('default', ['cachebreaker']);

    /*grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['bowercopy', 'concat', 'cssmin', 'uglify']);*/
};
