import EmptyList from '../components/EmptyList';
import InputFAB from '../components/InputFAB';
import List from '../components/List';

const ListScreen = () => {
  const todos = [
    // { id: 1, task: 'TEST', isDone: false }
  ];
  return (
    <>
      {todos.length ? <List /> : <EmptyList />}
      <InputFAB />
    </>
  );
};

export default ListScreen;
