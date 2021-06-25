import '../App.css';
import Active from './Active';
import SessionLength from './SessionLength';
import BreakLength from './BreakLength';
import store from '../store';

function App() {
  const state = store.getState();
  console.log(state);
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          25 + 5 Clock
        </h1>
        <BreakLength />
        <SessionLength />
        <Active />
      </header>
    </div>
  );
}

export default App;
