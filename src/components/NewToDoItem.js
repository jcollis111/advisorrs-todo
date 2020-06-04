import React, { Component } from "react";
import axios from "axios";

import classes from "./NewToDoItem.css";

class NewToDoItem extends Component {
  state = {
    todo: "",
  };

  newToDoHandler = () => {
    const keyID = Date.now() + "_" + Math.random();
    const data = {
      archived: false,
      completed: false,
      deleted: false,
      id: keyID,
      todo: this.state.todo,
    };
    if (this.state.todo !== "") {
      axios
        .post("https://advisorrs-todo.firebaseio.com/todos.json", data)
        .then(this.setState({ todo: "" }))
        .then(this.props.added());
    }
  };

  render() {
    return (
      <div className={classes.NewToDo}>
        <div className={classes.NewToDo}>
          <input
            className={classes.EntryBox}
            type="text"
            value={this.state.todo}
            onChange={(event) => this.setState({ todo: event.target.value })}
          />
        </div>
        <div>
          <button
            className={classes.Add}
            onClick={() => {
              this.newToDoHandler();
              this.props.added();
            }}
          >
            ADD TASK
          </button>
        </div>
      </div>
    );
  }
}

export default NewToDoItem;
