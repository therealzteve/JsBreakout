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
		  },
		  karma: {
			  unit: {
			    options: {
			      files: ['lib/**/*.js', 'app/**/*.js'],
			      browsers: ['PhantomJS'],
			      frameworks: ['jasmine']
			    }
			  }
			}
		});
	
	grunt.loadNpmTasks('grunt-include-source');
	grunt.loadNpmTasks('grunt-karma');
	 // A very basic default task.
	  grunt.registerTask('default', 'Log some stuff.', function() {
	    grunt.log.write('Logging some stuff...').ok();
	  });
	  
}