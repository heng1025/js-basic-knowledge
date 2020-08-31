const path = require('path')

class Compiler {
  constructor(config) {
    this.config = config
    this.modules = {}
    this.entry = config.entry
    this.root = process.cwd()
  }
  run() {
    console.log('run')
  }
}

module.exports = Compiler
