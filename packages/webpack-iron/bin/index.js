#!/usr/bin/env node

// step
// prepare
// 1. 获取配置文件并解析
// 2. analyse deps
// 3. define require and epoxrt ,then generate template
// 4. output

// https://astexplorer.net/
// https://juejin.im/post/6844903858179670030

const path = require('path')
const fs = require('fs')
// get ast from source
const { parse: babelParser } = require('@babel/parser')
// traverse ast
const { default: babelTraverse } = require('@babel/traverse')
// transform es6 and generate source from ast
const { transformFromAstSync } = require('@babel/core')
const rimraf = require('rimraf')

const config = require(path.resolve('ironpack.config.js'))

// build single file
function buildModule(file) {
  const content = fs.readFileSync(file, 'utf8')
  const deps = []

  const ast = babelParser(content, {
    sourceType: 'module', // es6 module
  })

  babelTraverse(ast, {
    // 根据模块导入提取依赖
    ImportDeclaration({ node }) {
      const { value } = node.source
      const dirname = path.dirname(file)
      const moduleName = `./${path.join(dirname, value)}`
      node.source.value = moduleName
      deps.push(moduleName)
    },
  })

  const { code } = transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env'],
  })

  return {
    [file]: {
      code,
      deps,
    },
  }
}

// collection all deps
function parseModules(file) {
  const entryModule = buildModule(file)
  const output = { ...entryModule }
  function recursionDeps(deps) {
    deps.forEach((dep) => {
      const module = buildModule(dep)
      Object.assign(output, module)
      const moduleDeps = module[dep].deps
      if (moduleDeps.length) {
        recursionDeps(moduleDeps)
      }
    })
  }
  recursionDeps(entryModule[file].deps)
  return output
}

function generateBundleTemplate(file) {
  const depsGraph = JSON.stringify(parseModules(file))
  return `(function (graph) {
    function require(f) {
      var exports = {};
      ;(function (exports, code) {
        eval(code)
      })(exports, graph[f].code)
      return exports
    }
    require('${file}')
  })(${depsGraph})`
}

function emitFile({ entry = './src/index.js', output = 'dist/main.js' }) {
  const dirname = path.dirname(output)
  rimraf.sync(dirname)
  if (dirname) {
    fs.mkdirSync(dirname)
  }

  let content = generateBundleTemplate(entry)
  fs.writeFileSync(output, content)
}

emitFile(config)
