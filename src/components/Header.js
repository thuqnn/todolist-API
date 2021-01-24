import React, { useState } from "react";
import classes from "./Header.module.css";

function Header({ onAddTodo }) {
  const [currentItem, setCurrentItem] = useState("");
  const [setError] = useState(false);
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleChange = (value) => {
    setCurrentItem(value);
  };

  const handeKeyDown = (event) => {
    if (event.keyCode === 13 && currentItem) {
      try {
        setLoading(true);
        onAddTodo(currentItem);
        setCurrentItem("");
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
      setReload(reload + 1);
    }
  };

  return (
    <header className={classes.heading}>
      <h1>Tasks</h1>
      <input
        disabled={loading}
        type="text"
        value={currentItem}
        placeholder="Add a task"
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(event) => handeKeyDown(event)}
      />
    </header>
  );
}

export default Header;
