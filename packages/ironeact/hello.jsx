const root = document.getElementById('root')

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

/* const node = IReact.createElement('h1', { title: 'foo' }, 'Hello World') */

console.log('node', node)
IReact.render(node, root)
