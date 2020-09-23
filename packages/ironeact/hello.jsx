/* @jsx IReact.createElement */
const node = (
  <div>
    <h1>
      <p>xiaoming</p>
      <a>iron</a>
    </h1>
    <h2>heng</h2>
  </div>
)

console.log('node', node)

const root = document.getElementById('root')
IReact.render(node, root)
