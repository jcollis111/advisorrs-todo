import React, { Component } from "react";
import axios from "axios";

import ToDo from "./ToDo";
import classes from "./ToDos.css";
import Navigation from "../Navigation/Navigation";

class ArchivedToDos extends Component {
  state = { todos: [] };

  refreshToDos = () => {
    let uTodos = [];
    axios
      .get("https://advisorrs-todo.firebaseio.com/todos.json")
      .then((response) => {
        const updatedToDos = response.data;
        //        console.log(response);
        if (response.data !== null) {
          Object.keys(updatedToDos).forEach((todo) => {
            //           console.log("todo dbID - " + todo);
            //            console.log("updatedToDos[todo]" + updatedToDos[todo]);
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
    let archivedtodos = [];

    if (this.state.todos !== []) {
      this.state.todos.forEach((todo) => {
        if (todo.deleted) {
        } else if (todo.archived) {
          archivedtodos = [
            ...archivedtodos,
            <ToDo key={todo.id} data={todo} whendeleted={this.refreshToDos} />,
          ];
        }
      });
    }

    if (!archivedtodos[0]) archivedtodos = <p>No To Do's!</p>;

    return (
      <div>
        <Navigation page="Archive" />
        <div className={classes.ToDos}>{archivedtodos}</div>
      </div>
    );
  }
}

export default ArchivedToDos;
