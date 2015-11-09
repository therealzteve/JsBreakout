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
			      files: [
			              {pattern: 'app/**/*.js', included: false},
			              {pattern: '_test/**/*.js', included: false},
			              '_test/test-main.js'
			              ],
			      browsers: ['PhantomJS'],
			      frameworks: ['jasmine', 'requirejs']
			    }
			  }
			},
			requirejs: {
				  js: {
				      options: {
				          uglify2: {
				              mangle: false
				          },
				          baseUrl: "lib",
				          mainConfigFile: "app.js",
				          name: 'app/game',
				          out: "public/build/main.js",
				          optimize: 'uglify2'
				      }
				  }
				}
		});
	
	grunt.loadNpmTasks('grunt-include-source');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	 // A very basic default task.
	  grunt.registerTask('default', 'Log some stuff.', function() {
	    grunt.log.write('Logging some stuff...').ok();
	  });
	  
}