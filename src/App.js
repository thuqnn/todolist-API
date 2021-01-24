import React, { useState } from "react";
import _ from "lodash";
import CompleteTask from "./components/CompleteTask";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import "antd/dist/antd.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./App.css";

import {
  addTodo,
  getTodos,
  ChangeTaskCompletedState,
  ChangeTaskFavoriteState,
} from "./services/TodoService";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
  const [taskLists, setTaskLists] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    try {
      setLoading(true);
      const detailResponse = await getTodos();
      setTaskLists(detailResponse);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [reload]);

  const renderContent = () => {
    return loading ? (
      <Spin indicator={antIcon} />
    ) : (
      <>
        <Header onAddTodo={handleAddTodo} />
        <TaskList
          incompleteItems={inCompletedList}
          onChangeCompleteStatus={handleChangeCompleteStatus}
          onChangeFavoriteStatus={handleChangeFavoriteStatus}
        />
        <CompleteTask
          completedItems={completedList}
          onChangeCompleteStatus={handleChangeCompleteStatus}
          onChangeFavoriteStatus={handleChangeFavoriteStatus}
        />
        ;
      </>
    );
  };

  const renderErrorContent = () => {
    return (
      <div>
        <div>Loi roi</div>
        <button
          onClick={() => {
            setLoading(true);
            setError(false);
            setReload(reload + 1);
          }}
        >
          Tai lai
        </button>
      </div>
    );
  };
  const handleAddTodo = async (newTaskName) => {
    try {
      setLoading(true);
      const detailAddTodo = await addTodo(newTaskName);
      setTaskLists(detailAddTodo);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }

    setReload(reload + 1);
  };

  const handleChangeCompleteStatus = async (taskId, newStatus) => {
    try {
      setLoading(true);
      const detailChangeCompleted = await ChangeTaskCompletedState(
        taskId,
        newStatus
      );
      setTaskLists(detailChangeCompleted);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
    setReload(reload + 1);
  };

  const handleChangeFavoriteStatus = async (taskId, newStatus) => {
    try {
      setLoading(true);
      const detailChangeFavorite = await ChangeTaskFavoriteState(
        taskId,
        newStatus
      );
      setTaskLists(detailChangeFavorite);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }

    setReload(reload + 1);
  };
  const [completedList, inCompletedList] = _.partition(
    taskLists,
    (t) => t.isCompleted
  );

  return (
    <div className="App">
      <div>{error ? renderErrorContent() : renderContent()}</div>
    </div>
  );
}

export default React.memo(App);
