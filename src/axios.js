import axios from "axios";

const instance = axios.create({
  baseURL: "https://advisorrs-todo.firebaseio.com/",
});

export default instance;
