import { useState } from 'react';
import EmptyList from '../components/EmptyList';
import InputFAB from '../components/InputFAB';
import List from '../components/List';
import { v4 } from "uuid";
import "expo-standard-web-crypto";

const ListScreen = () => {
  const [todos, setTodos] = useState([]);

  const onInsert = (task) => {
    const id = v4();
    const newTask = { id, task, isDone: false };
    setTodos((Prev) => [newTask, ...Prev]);
  };

  return (
    <>
      {todos.length ? <List data={todos} /> : <EmptyList />}
      <InputFAB onInsert={onInsert} />
    </>
  );
};

export default ListScreen;
