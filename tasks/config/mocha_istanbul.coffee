module.exports = (grunt) ->
  grunt.config.set 'mocha_istanbul',
  coveralls:
    src: [
      'test/unit'
    ]
    options:
      coverage: true
      # check:
      #   lines: 45
      #   statements: 45
      root: 'api/'
      reportFormats: [
        'cobertura'
        'lcovonly'
      ]

  # grunt.event.on 'coverage', (lcovFileContents, done) ->
  #   # Check below on the section "The coverage event"
  #   done()
  #   return
  grunt.loadNpmTasks 'grunt-mocha-istanbul'

  return
