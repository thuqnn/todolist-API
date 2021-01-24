import React from "react";
import TaskListItems from "./TaskListItems";
import classes from "./ListItem.module.css";

export default function ListItem({
  renderedItems,
  listName,
  onChangeCompleteStatus,
  onChangeFavoriteStatus,
}) {
  return (
    <section className={classes.listTask}>
      <h2>{listName}</h2>
      <ul>
        {renderedItems.map((task, index) => (
          <TaskListItems
            key={index}
            task={task}
            onChangeCompleteStatus={onChangeCompleteStatus}
            onChangeFavoriteStatus={onChangeFavoriteStatus}
          />
        ))}
      </ul>
    </section>
  );
}
