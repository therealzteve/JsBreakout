module.exports = function(grunt){
	
	grunt.initConfig({
		  includeSource: {
		    options: {
		      basePath: '',
		      baseUrl: ''
		    },
		    myTarget: {
		      files: {
		        'index2.html': 'index.html'
		      }
		    }
		  }
		});
	
	grunt.loadNpmTasks('grunt-include-source');

	 // A very basic default task.
	  grunt.registerTask('default', 'Log some stuff.', function() {
	    grunt.log.write('Logging some stuff...').ok();
	  });
}