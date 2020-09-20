const path = require('path')
const fs = require('fs')
// 得到ast
const babelParser = require('@babel/parser')
const { default: babelTraverse } = require('@babel/traverse')
const { default: generate } = require('@babel/generator')

class Compiler {
  constructor(config) {
    this.config = config
    this.modules = {}
    this.entryId
    this.entry = config.entry
    this.root = process.cwd()
  }
  run() {
    const entyPath = path.resolve(this.root, this.entry)
    this.buildModule(entyPath, true)
    this.emitFile()
  }
  getSource(path) {
    return fs.readFileSync(path, 'utf8')
  }
  buildModule(modulePath, isEntry) {
    console.log('Compiler -> buildModule -> modulePath', modulePath)
    let source = this.getSource(modulePath)
    let moduleName = './' + path.relative(this.root, modulePath)
    if (isEntry) {
      this.entryId = moduleName
    }
    console.log('Compiler -> buildModule -> moduleName', moduleName)
    const { sourceCode, deps } = this.parse(source, path.dirname(moduleName))
    this.modules[moduleName] = sourceCode
  }
  parse(source, parentPath) {
    // console.log('Compiler -> parse -> parentPath', parentPath)
    // console.log('Compiler -> parse -> source', source)
    const ast = babelParser.parse(source, {
      sourceType: 'module',
    })
    console.log('Compiler -> parse -> ast', ast)
    const self  = this;
    babelTraverse(ast, {
      CallExpression({node}) {

      },
      ImportDeclaration({ node }) {
        const dirname = path.dirname(parentPath)
        const { value } = node.source
        console.log('Compiler -> ImportDeclaration -> value', value)
        self.modules[value] = self.getSource(parentPath)
      },
    })
  }
  emitFile() {}
}

module.exports = Compiler
