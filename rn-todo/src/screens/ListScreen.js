import EmptyList from '../components/EmptyList';
import List from '../components/List';

const ListScreen = () => {
  const todos = [
    // { id: 1, task: 'TEST', isDone: false }
  ];
  return todos.length ? <List /> : <EmptyList />;
};

export default ListScreen;
