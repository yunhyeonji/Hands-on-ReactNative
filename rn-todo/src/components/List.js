import { View, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import { GRAY } from '../Color';

const Separator = () => {
  return <View style={styles.Separator}></View>;
};

const List = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ListItem item={item} />}
      windowSize={5}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={View}
      ListHeaderComponentStyle={{ height: 10 }}
    />
  );
};
List.propTypes = {
  data: PropTypes.array.isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Separator: {
    height: 1,
    backgroundColor: GRAY.LIGHT,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default List;