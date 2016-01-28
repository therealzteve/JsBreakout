// list of files / patterns to load in the browser 
files = [
  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
 
  {pattern: 'lib/**/*.js', included: false},
  {pattern: 'src/**/*.js', included: false},
  {pattern: 'test/**/*Spec.js', included: false},
 
  'test/test-main.js'
];
 
// list of files to exclude 
exclude = [
    'src/main.js'
];

