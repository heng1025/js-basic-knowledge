/* @jsx IReact.createElement */
const node = (
  <div>
    <h1>
      <p
        onClick={e => {
          console.log('click', e);
        }}
      >
        xiaoming
      </p>
      <a>iron</a>
    </h1>
    <h2>heng</h2>
  </div>
);

console.log('node', node);

function App(props) {
  console.log('App -> props', props);
  return (
    <div>
      <div>function compoent</div>
    </div>
  );
}

function Counter() {
  const [count, setCount] = IReact.useState(0);
  return <div onClick={() => setCount(c => c + 1)}>Count:{count}</div>;
}

// render to document
const root = document.getElementById('root');
IReact.render(<Counter />, root);
