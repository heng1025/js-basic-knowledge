function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

// create React Node
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  }
}

// render React Node
function render(element, container) {
  // text node
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type)

  // assign props
  Object.keys(element.props)
    .filter((key) => key !== 'children')
    .forEach((name) => {
      dom[name] = element.props[name]
    })

  // recursive add child element
  element.props.children.forEach((child) => {
    render(child, dom)
  })

  // add to document
  container.appendChild(dom)
}

const IReact = {
  createElement,
  render,
}

// Concurrent Mode
let nextUnitOfWork = null
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(nextUnitOfWork) {}

const root = document.getElementById('root')
const node = IReact.createElement('h1', { title: 'foo' }, 'Hello World')
console.log('node', node)
IReact.render(node, root)
