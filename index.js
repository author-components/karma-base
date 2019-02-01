// Karma configuration
module.exports = (root, buildfile) => {
  if (!root) {
    root = process.cwd()
  }

  let base = require('@author.io/karma-base')(root)

  let preprocessors = () => {
    let cfg = {}

    cfg[`${root}/**/*.js`] = ['browserify']
    cfg[`${root}/test.html`] = 'html2js'

    return cfg
  }

  let custombase = Object.assign({}, base)
  custombase.configuration.preprocessors = preprocessors()

  // Override Files
  delete custombase.getFiles
  custombase.getFiles = (file, module = false) => {
      let mainfile = {
      pattern: path.join(process.cwd(), file),
      nocache: true
    }

    if (module) {
      mainfile.type = 'module'
    }

    return [
      mainfile,
      path.join(root, '/*.js'),
      path.join(root, 'test.html')
    ]
  }

  return config => {
    const files = custombase.getFiles(buildfile)

    base.displayFiles(files)

    config.set(Object.assign(custombase.configuration, {
      files,
      logLevel: config.LOG_INFO
    }))
  }
}
