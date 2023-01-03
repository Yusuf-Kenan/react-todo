import React, { useState } from "react";

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodos, setEditTodos] = useState(false);
  const [updatedText, setUpdatedText] = useState("");
  const [willupdateTodo, setWillupdateTodo] = useState(null);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    //validation
    if (todoText === "") {
      alert("please type todo");
      return;
    }
    const newToDo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date(),
      done: false,
    };
    setTodos([...todos, newToDo]);
    setTodoText("");
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((i) => i.id !== id);
    setTodos(filteredTodos);
  };
  const changeDone = (todo) => {
    let tempTodos = [];
    todos.map((item, index) => {
      if (item.id === todo.id) {
        let updatedTodo = { ...todo, done: !todo.done };
        tempTodos.push(updatedTodo);
      } else {
        tempTodos.push(item);
      }
      setTodos(tempTodos);
    });
    /*
    -------FOR YUKARIDAKIYLE AYNI-----

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === todo.id) {
        let updatedTodo = { ...todo, done: !todo.done };
        tempTodos.push(updatedTodo);
      } else {
        tempTodos.push(todos[i]);
      }
    }
    setTodos(tempTodos);
    */
  };
  const updatedNewTodo=(event)=>{
    event.preventDefault()
    if(willupdateTodo===""){
      alert("cant save empty")
      return
    } 
    let tempTodos=[];
    todos.map(item =>{
      if(item.id===willupdateTodo.id){
        let updatedTodo={
          ...willupdateTodo,
          title:updatedText
        }
        tempTodos.push(updatedTodo)
      }else{
        tempTodos.push(item)
      }
    })
    setTodos(tempTodos)
    setEditTodos(false)

  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            value={todoText}
            onChange={(event) => {
              setTodoText(event.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Your ToDo..."
          />
          <button className="btn btn-primary" type="submit">
            ADD
          </button>
        </div>
      </form >
      {editTodos === true && (
        <form onSubmit={updatedNewTodo}>
          <div className="input-group mb-3">
            <input
              value={updatedText}
              onChange={(event) => {
                setUpdatedText(event.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Your ToDo..."
            />
            <button className="btn btn-sm btn-info" type="submit">
              SAVE
            </button>
            <button
              onClick={() => {
                setEditTodos(false);
              }}
              className="btn btn-sm btn-secondary"
              type="submit"
            >
              CANCEL
            </button>
          </div>
        </form>
      )}

      <div className="container">
        {todos.length === 0 ? (
          <p className="text-center">Youd dont have any list</p>
        ) : (
          <>
            {todos.map((item, index) => (
              <div
                key={index}
                style={{ borderBottom: "1px solid gray" }}
                className="d-flex justify-content-between aling-items-center"
              >
                <div>
                  <h1
                    style={{
                      textDecoration:
                        item.done === true ? "line-through" : "none",
                    }}
                    key={index}
                  >
                    {index + 1}- {item.title}{" "}
                  </h1>
                  <small>{new Date(item.date).toLocaleDateString()}</small>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteTodo(item.id);
                    }}
                    className="btn btn-sm btn-danger"
                  >
                    DLT
                  </button>
                  <button
                    onClick={() => {
                      setEditTodos(true);
                      setUpdatedText(item.title);
                      setWillupdateTodo(item)
                    }}
                    className="btn btn-sm btn-warning"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => changeDone(item)}
                    className="btn btn-sm btn-success"
                  >
                    {item.done === false ? "DO" : "DONE"}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
