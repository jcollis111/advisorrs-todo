import React, { Component } from "react";
import axios from "axios";

import NewToDoItem from "../components/NewToDoItem";
import ToDo from "./ToDo";
import classes from "./ToDos.css";
import Navigation from "../Navigation/Navigation";

class ToDos extends Component {
  state = { todos: [] };

  refreshToDos = () => {
    let uTodos = [];
    axios
      .get("https://advisorrs-todo.firebaseio.com/todos.json")
      .then((response) => {
        const updatedToDos = response.data;
        if (response.data !== null) {
          Object.keys(updatedToDos).forEach((todo) => {
            uTodos = [
              ...uTodos,
              {
                archived: updatedToDos[todo].archived,
                completed: updatedToDos[todo].completed,
                deleted: updatedToDos[todo].deleted,
                dbid: todo.toString(),
                id: updatedToDos[todo].id,
                todo: updatedToDos[todo].todo,
              },
            ];
          });
          this.setState({ todos: uTodos });
        }
      });
  };

  componentDidMount() {
    this.refreshToDos();
  }

  render() {
    let activeTodos = [];
    let completeTodos = [];

    if (this.state.todos !== []) {
      this.state.todos.forEach((todo) => {
        if (todo.deleted) {
        } else if (todo.archived) {
        } else if (todo.completed) {
          completeTodos = [
            ...completeTodos,
            <ToDo
              key={todo.id}
              data={todo}
              whenarchived={this.refreshToDos}
              whendeleted={this.refreshToDos}
              whencompleted={this.refreshToDos}
            />,
          ];
        } else {
          activeTodos = [
            ...activeTodos,
            <ToDo
              key={todo.id}
              data={todo}
              whenchanged={this.refreshToDos}
              whendeleted={this.refreshToDos}
              whencompleted={this.refreshToDos}
            />,
          ];
        }
      });
    }

    return (
      <div>
        <Navigation page="Active" />
        <NewToDoItem added={this.refreshToDos} className={classes.ToDos} />
        <div className={classes.ToDos}>{activeTodos}</div>
        <hr className={classes.hr} />
        <div className={classes.ToDos}>{completeTodos}</div>
      </div>
    );
  }
}

export default ToDos;
