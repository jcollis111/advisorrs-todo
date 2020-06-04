import React, { Component } from "react";
import axios from "axios";

import classes from "./ToDos.css";

import archiveSmallBlue from "../graphics/archive-small-blue.svg";
import squareBlue from "../graphics/square-blue.svg";
import checkSquareBlue from "../graphics/check-square-blue.svg";
import squareWhite from "../graphics/square-white.svg";
import checkSquareWhite from "../graphics/check-square-white.svg";
import trashBlue from "../graphics/trash-blue.svg";
import trashWhite from "../graphics/trash-white.svg";

class ToDo extends Component {
  state = {
    archived: this.props.data.archived,
    completed: this.props.data.completed,
    dbid: this.props.data.dbid,
    deleted: this.props.data.deleted,
    id: this.props.data.id,
    todo: this.props.data.todo,
  };

  archiveHandler = () => {
    const newstate = { ...this.state };
    newstate.archived = true;

    axios
      .put(
        `https://advisorrs-todo.firebaseio.com/todos/${this.state.dbid}.json`,
        newstate
      )
      .then(
        this.setState(() => {
          return { archived: true };
        })
      )
      .then(this.props.whenarchived);
  };

  checkboxHandler = () => {
    const newstate = { ...this.state };
    newstate.completed = !newstate.completed;
    this.setState(() => {
      return { completed: newstate.completed };
    });

    axios
      .put(
        `https://advisorrs-todo.firebaseio.com/todos/${this.state.dbid}.json`,
        newstate
      )
      .then(this.props.whencompleted);
  };

  deleteHandler = () => {
    const newstate = { ...this.state };
    newstate.deleted = true;
    this.setState(() => {
      return { deleted: true };
    });

    axios
      .put(
        `https://advisorrs-todo.firebaseio.com/todos/${this.state.dbid}.json`,
        newstate
      )
      .then(this.props.whendeleted);
  };

  render() {
    let checkboxIcon = null;
    let archiveIcon = null;
    let trashIcon = null;

    let cbIcon = null;
    if (this.state.archived) {
      cbIcon = this.state.completed ? checkSquareWhite : squareWhite;
    } else {
      cbIcon = this.state.completed ? checkSquareBlue : squareBlue;
    }
    checkboxIcon = (
      <img
        className={classes.ToDoIcon}
        src={cbIcon}
        alt={this.state.completed ? "Completed" : "Not completed"}
        onClick={this.checkboxHandler}
      />
    );

    archiveIcon = (
      <img
        alt="Archive"
        className={classes.ToDoIcon}
        onClick={this.archiveHandler}
        src={archiveSmallBlue}
        style={{
          visibility:
            !this.state.archived && this.state.completed ? "visible" : "hidden",
        }}
      />
    );

    trashIcon = (
      <img
        className={classes.ToDoIcon}
        src={this.state.archived ? trashWhite : trashBlue}
        alt="Delete"
        onClick={this.deleteHandler}
      />
    );

    let textClass = null;
    if (this.state.completed) {
      if (this.state.archived) {
        textClass = [classes.ToDo, classes.ArchivedCompleted].join(" ");
      } else {
        textClass = [classes.ToDo, classes.ActiveCompleted].join(" ");
      }
    } else if (this.state.archived) {
      textClass = [classes.ToDo, classes.Archived].join(" ");
    } else {
      textClass = [classes.ToDo, classes.Active].join(" ");
    }

    if (this.state.deleted) {
      return null;
    } else {
      return (
        <div className={classes.ToDo}>
          <div
            className={textClass}
            archived={this.state.archived.toString()}
            completed={this.state.completed.toString()}
          >
            {checkboxIcon}
            <div className={classes.ToDoText}>{this.state.todo}</div>
            {archiveIcon}
            {trashIcon}
          </div>
        </div>
      );
    }
  }
}

export default ToDo;
