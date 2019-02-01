const path = require('path')
let base = require('@author.io/karma-base')

module.exports = (root, buildfile) => {
  if (!root) {
    root = process.cwd()
  }

  let preprocessors = () => {
    let cfg = {}

    cfg[`${root}/**/*.js`] = ['browserify']
    cfg[`${root}/test.html`] = 'html2js'

    return cfg
  }

  base.configuration.preprocessors = preprocessors()

  let custombase = Object.assign({}, base)

  // Override getFiles
  delete custombase.getFiles
  custombase.getFiles = function (file, module = false) {
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

    custombase.displayFiles(files)

    config.set(Object.assign(custombase.configuration, {
      files,
      logLevel: config.LOG_INFO
    }))
  }
}
