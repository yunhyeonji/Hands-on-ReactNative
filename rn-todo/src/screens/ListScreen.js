import { StyleSheet, Text, View, FlatList } from 'react-native';
import { PropTypes } from 'prop-types';

const ListScreen = () => {
  const todos = [];
  for (let i = 1; i < 501; i++) {
    todos.push({ id: i, task: `task ${i}` });
  }
  return (
    // ScrollView 와 FlatList
    // Key에 대한 설정여부가 다름 -> FlatList : Key를 설정하지 않아도 자동으로 할당함. ScrollList는 Key를 설정해줘야 오류가 안남.
    // 렌더링하는 수에 차이가 있음 -> FlatList : 필요한 만큼만 렌더링하고 스크롤할때마다 추가적으로 렌더링. ScrollList는 한번에 렌더링.
    // 렌더링 양이 적거나 양이 정해져있을때 ScrollView를 사용하고(회원가입) ,
    // 데이터의 양이 많거나 크기를 예측할 수 없을때 FlatList 사용(친구목록, 글목록)

    // <ScrollView style={Styles.container}>
    //   {todos.map((item) => {
    //     console.log(item.id);
    //     return (
    //       <View
    //         key={item.id}
    //         style={{ paddingHorizontal: 20, paddingVertical: 10 }}
    //       >
    //         <Text style={{ fontSize: 20 }}>{item.task}</Text>
    //       </View>
    //     );
    //   })}
    // </ScrollView>

    <FlatList
      style={Styles.container}
      data={todos}
      renderItem={({ item }) => {
        return (
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={{ fontSize: 20 }}>{item.task}</Text>
          </View>
        );
      }}
      keyExtractor={(item) => {
        item.id.toString();
      }}
    />
  );
};

ListScreen.propTypes = {
  navigation: PropTypes.object,
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListScreen;
