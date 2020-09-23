module.exports = (api) => {
  api.cache(false)
  return {
    sourceMaps: 'inline',
    plugins: ['@babel/plugin-transform-react-jsx'],
  }
}
