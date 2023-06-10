import { useState } from 'react';
import EmptyList from '../components/EmptyList';
import InputFAB from '../components/InputFAB';
import List from '../components/List';
import { v4 } from "uuid";
import "expo-standard-web-crypto";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

const ListScreen = () => {
  const [todos, setTodos] = useState([
    {id:'1', task:'tesk1', isDone:false},
    {id:'2', task:'tesk2', isDone:false},
    {id:'3', task:'tesk3', isDone:false},
    {id:'4', task:'tesk4', isDone:false},
    {id:'5', task:'tesk5', isDone:false},
    {id:'6', task:'tesk6', isDone:false},
    {id:'7', task:'tesk7', isDone:false},
    {id:'8', task:'tesk8', isDone:false},
    {id:'9', task:'tesk9', isDone:false},
    {id:'10', task:'tesk10', isDone:false},
    {id:'11', task:'tesk11', isDone:false},
    {id:'12', task:'tesk12', isDone:false},
    {id:'13', task:'tesk13', isDone:false},
  ]);
  const [isBottom, setIsBottom] = useState(false);
  const { bottom } = useSafeAreaInsets();

  const onInsert = (task) => {
    const id = v4();
    const newTask = { id, task, isDone: false };
    setTodos((Prev) => [newTask, ...Prev]);
  };

  return (
    <View style={{ paddingBottom: bottom, flex: 1 }}>
      {todos.length ? (
        <List data={todos} setIsBottom={setIsBottom} />
      ) : (
        <EmptyList />
      )}
      <InputFAB onInsert={onInsert} isBottom={isBottom} />
    </View>
  );
};

export default ListScreen;
