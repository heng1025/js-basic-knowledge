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
      <a b="1">iron</a>
    </h1>
    <h2 foo="668">heng</h2>
  </div>
);

// console.log('node', node);

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
  const [time, setTime] = IReact.useState(10);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)} a="1" style="width: 30px">
        +
      </button>
      Count:{count}
      <button onClick={() => setTime(t => t - 1)} style="width: 30px">
        -
      </button>
      Time:{time}
    </div>
  );
}

// render to document
const root = document.getElementById('root');
IReact.render(<Counter />, root);
