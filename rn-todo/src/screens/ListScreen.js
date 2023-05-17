import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from '../components/ListItem';
import { GRAY } from '../Color';

const Styles = StyleSheet.create({
  Separator: {
    height: 1,
    backgroundColor: GRAY.LIGHT,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

const Separator = () => {
  return <View style={Styles.Separator}></View>;
};

const ListScreen = () => {
  const todos = [
    { id: 1, task: 'React Native 1', isDone: false },
    { id: 2, task: 'React Native 2', isDone: true },
    { id: 3, task: 'React Native 3', isDone: true },
    { id: 4, task: 'React Native 4', isDone: false },
    { id: 5, task: 'React Native 5', isDone: false },
  ];

  return (
    // ScrollView 와 FlatList
    // Key에 대한 설정여부가 다름 -> FlatList : Key를 설정하지 않아도 자동으로 할당함. ScrollList는 Key를 설정해줘야 오류가 안남.
    // 렌더링하는 수에 차이가 있음 -> FlatList : 필요한 만큼만 렌더링하고 스크롤할때마다 추가적으로 렌더링. ScrollList는 한번에 렌더링.
    // 렌더링 양이 적거나 양이 정해져있을때 ScrollView를 사용하고(회원가입) ,
    // 데이터의 양이 많거나 크기를 예측할 수 없을때 FlatList 사용(친구목록, 글목록)

    <FlatList
      data={todos}
      renderItem={({ item }) => <ListItem item={item} />}
      // 값이 작으면 메모리 절약, 값이 작으면 빈 화면이 나올 사능성이 있음
      // windowSize={21} // 이전 화면 10개 / 현재화면 1개 / 다음 화면 10개
      windowSize={5} // 이전 화면 2개 / 현재화면 1개 / 다음 화면 2개
      ItemSeparatorComponent={Separator}
      // ListHeaderComponent={() => <View style={{ height: 10 }} />}
      ListHeaderComponent={View}
      ListHeaderComponentStyle={{ height: 10 }}
    />

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
  );
};

export default ListScreen;
