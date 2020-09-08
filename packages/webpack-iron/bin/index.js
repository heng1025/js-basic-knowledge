#!/usr/bin/env node

// step
// prepare
// 获取配置文件并解析

// 1. get source
// 2. compile
// 3. output
const path = require('path')
const fs = require('fs')
const babelParser = require('@babel/parser')
const { default: babelTraverse } = require('@babel/traverse')
const { default: generate } = require('@babel/generator')

// config path
const configPath = path.resolve('ironpack.config.js')
const config = require(configPath)
const { entry, output } = config

const entryPath = path.resolve(configPath, '..', entry)

function getDeps(filePath) {
  const deps = {}
  const file = fs.readFileSync(filePath, 'utf8')
  const ast = babelParser.parse(file, {
    sourceType: 'module',
  })

  babelTraverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filePath)
      const { value } = node.source
      deps[value] = path.join(dirname, value)
    },
  })
  return deps
}

// transform all deps
// const deps = parseFile(entrySource)
// console.log('deps', deps)

function parseModules(filePath) {
  const temp = []
  function traverse(deps) {
    Object.values(deps).forEach(([key, value]) => {
      traverse(deps)
    })
  }
  traverse(getDeps(filePath))
}

parseModule()
// generate code from ast
// const { code } = generate(ast)
// console.log('code', code)
