import useCounter from "./hooks/use-counter";

import "./App.css";

function App() {
  const { allCounters, incrementCount } = useCounter();

  return (
    <div className="counterContainer">
      {allCounters.map(({ count, id }) => (
        <div key={id} className="counterSection">
          <div className="counter">
            Count_{id}: {count}
          </div>
          <button onClick={() => incrementCount(id)} className="counterBtn">
            Increment C{id}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
