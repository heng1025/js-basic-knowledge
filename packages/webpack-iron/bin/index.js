#!/usr/bin/env node

// step
// prepare
// 1. 获取配置文件并解析
// 2. analyse deps
// 3. compile
// 4. output

// https://astexplorer.net/

const path = require('path')
const fs = require('fs')
// get ast from source
const { parse: babelParser } = require('@babel/parser')
// traverse ast
const { default: babelTraverse } = require('@babel/traverse')
// generate source from ast
const { default: generate } = require('@babel/generator')
// transform es6 and generate source from ast
const { transformFromAstSync } = require('@babel/core')

// config path
const configPath = path.resolve('ironpack.config.js')

const config = require(configPath)
const { entry, output } = config

// build single file
function buildModule(file) {
  const content = fs.readFileSync(file, 'utf8')
  const deps = []

  const ast = babelParser(content, {
    sourceType: 'module', // es6 module
  })

  const { code } = transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env'],
  })

  babelTraverse(ast, {
    // 根据模块导入提取依赖
    ImportDeclaration({ node }) {
      const { value } = node.source
      const dirname = path.dirname(file)
      const moduleName = `./${path.join(dirname, value)}`
      deps.push(moduleName)
    },
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
  const output = [entryModule]
  function recursionDeps(deps) {
    deps.forEach((dep) => {
      const module = buildModule(dep)
      output.push(module)
      if (module[dep].deps.length) {
        recursionDeps(module[dep].deps)
      }
    })
  }
  recursionDeps(entryModule[file].deps)
  return output
}

// function generateBundleTemplate(deps) {
//   const deps = parseModules(entry)
//   (function (deps) {})(deps)
// }

function emitFile(output, deps) {
  const dirname = path.dirname(output)
  if (dirname) {
    fs.mkdirSync(dirname)
  }
  // fs.writeFileSync(output, JSON.stringify(deps))
}

// const deps = parseModules(entry)
const deps = buildModule(entry)
console.log('deps', deps)
// emitFile(output, deps)
