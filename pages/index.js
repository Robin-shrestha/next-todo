import React, { useState, useRef } from "react";
import todoList from "../mockStorage.txt";
import ErrorComponent from "../component/ErrorComponent";
import path from "path";
import fs from "fs";

let initialState = {
  todo: "",
  completed: false,
};

const Todo = ({ todoList }) => {
  const formRef = useRef();
  const [todo, setTodo] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [todos, setTodos] = useState(todoList);

  const errorSetter = (name, message) => {
    setErrors((curr) => {
      let temp = curr.some((el) => el?.field === name);
      if (temp) {
        return curr.map((el) => {
          if (el.field === name) {
            return { ...el, message: message };
          }
        });
      } else {
        return [
          ...curr,
          {
            field: name,
            message: message,
          },
        ];
      }
    });
  };

  const errorRemover = (name) => {
    setErrors((curr) => {
      let temp = curr.some((el) => el?.field === name);
      if (!temp) {
        return curr;
      } else {
        return curr.filter((el) => el.field !== name);
      }
    });
  };

  const validator = (name, value) => {
    switch (name) {
      case "todo":
        if (!value) {
          errorSetter(name, "Required");
          return false;
        } else if (value.length < 5) {
          errorSetter(name, "Must be greater than 5 characters");
          return false;
        } else {
          errorRemover(name);
          return true;
        }
      default:
        return true;
    }
  };

  const onChange = (e) => {
    if (e.target.type === "checkbox") {
      setTodo((curr) => {
        return {
          ...curr,
          [e.target.name]: e.target.checked,
        };
      });
    } else {
      // validator
      validator(e.target.name, e.target.value);
      setTodo((curr) => {
        return {
          ...curr,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValidArray = Object.entries(todo).map(([key, value]) => {
      return validator(key, value);
    });

    if (!isValidArray.some((el) => !el)) {
      setTodos((curr) => {
        return [...curr, { ...todo, id: curr.length + 1 }];
      });
      reset();
    }
  };

  const reset = (e) => {
    setTodo(initialState);
  };

  return (
    <div>
      <fieldset>
        <legend>Add TODO:</legend>

        <form ref={formRef} onSubmit={onSubmit} onReset={reset}>
          <div>
            <label>My Todo: </label>
            <input name="todo" value={todo.todo} onChange={onChange} />
            <ErrorComponent errorList={errors} name={"todo"} />{" "}
          </div>
          <div>
            <label>Completed: </label>
            <input
              name="completed"
              type="checkbox"
              checked={todo.completed}
              onChange={onChange}
            />
            <ErrorComponent errorList={errors} name={"completed"} />{" "}
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
          <div>
            <button type="reset">Reset</button>
          </div>
        </form>
      </fieldset>
      <div>
        <h4>My TODOS</h4>
        <ul>
          {todos.map((item, index) => {
            return (
              <li key={index}>
                <span>{item.todo}</span>{" "}
                <span>
                  <small>Completed</small>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(e) => {
                      setTodos((curr) => {
                        return curr.map((el) => {
                          if (el.id === item.id) {
                            return { ...el, completed: !el.completed };
                          }
                          return el;
                        });
                      });
                    }}
                  />
                </span>
                <span style={{ marginLeft: "1em" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setTodos((curr) => {
                        return curr
                          .filter((el) => el.id !== item.id)
                          .map((el) => el);
                      });
                    }}
                  >
                    Delete
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;

export async function getStaticProps(context) {
  // TODO get todlosit from db whenyou have one

  const filePath = path.join(process.cwd(), "mockStorage.txt");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const todoList = JSON.parse(fileContents);
  return {
    props: { todoList },
  };
}
