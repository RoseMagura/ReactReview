import './App.css';
import Active from './Active';
import SessionLength from './SessionLength';
import BreakLength from './BreakLength';

function App() {
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
