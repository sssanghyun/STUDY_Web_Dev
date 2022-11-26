import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (e) => setKeyword(e.target.value);
  
  useEffect(() => {
    console.log("i run only once.");
  }, []);
  useEffect(() => {
      console.log("I run when 'keyword' changes.");
  }, [keyword]);
  useEffect(() => {
      console.log("I run when 'counter' changes.");
  }, [counter]);
  return (
    <div>
      <input value={keyword} onChange={onChange} type="text" placeholder="Search here..."></input>
      <h1>{counter}</h1>
      <button onClick={onClick}>
        Click me!
      </button>
    </div>
  );
}

export default App;
