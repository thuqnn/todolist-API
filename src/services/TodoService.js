import axios from "axios";

const user = "sylk";
const apiEndpoint = "http://localhost:5000";
const getTodoEndpoint = `${apiEndpoint}/Todo/GetTodos`;
const addTodoEndpoint = `${apiEndpoint}/Todo/AddTodo`;
const changeTaskCompletedTodoEndpoint = `${apiEndpoint}/Todo/ChangeTaskCompletedState`;
const ChangeFavoriteTodoEndPoint = `${apiEndpoint}/Todo/ChangeTaskFavoriteState`;

export const getTodos = async () => {
  return (
    await axios.get(getTodoEndpoint, {
      params: {
        user: user,
      },
    })
  ).data.data;
};

export const addTodo = async (taskName) => {
  return await axios.post(addTodoEndpoint, {
    user: user,
    taskName: taskName,
  });
};

export const ChangeTaskCompletedState = async (taskId, newStatus) => {
  return await axios.post(changeTaskCompletedTodoEndpoint, {
    taskId: taskId,
    isCompleted: newStatus,
  });
};
export const ChangeTaskFavoriteState = async (taskId, newStatus) => {
  return await axios.post(ChangeFavoriteTodoEndPoint, {
    taskId: taskId,
    isFavorite: newStatus,
  });
};
