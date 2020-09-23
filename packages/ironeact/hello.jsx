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

const root = document.getElementById('root');
IReact.render(<App />, root);
