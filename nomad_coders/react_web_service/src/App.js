import { useState, useEffect } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (e) => setToDo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (toDo === ""){
      return;
    };
      setToDos((currentArray) => [toDo, ...currentArray]);
      setToDo("");
  };
  console.log(toDos);
  return (
    <div>
      <h1>My ToDo List ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} type="text" placeholder="Write your To-do..."></input>
        <button>Add To Do</button>
      </form>
      <hr />
      <ul> 
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
