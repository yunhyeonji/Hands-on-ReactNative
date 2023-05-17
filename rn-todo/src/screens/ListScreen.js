import { StyleSheet, Text, View, FlatList } from 'react-native';
import { memo } from 'react';
import { PropTypes } from 'prop-types';

const ListItem = memo(({ item }) => {
  console.log(item.id);
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontSize: 20 }}>{item.task}</Text>
    </View>
  );
});
// React.memo
// props에 변화가 없을 때 리렌더링을 방지
// 컴포넌트 렝더링 결과를 기억하고 있다가 리렌더링을 해야 할 때, 변화가 없으면 기억하고 있던 렌더링 결과를 재사용
// props의 변경 여부가 아닌  다른 이유로 인한 리렌더링에는 영향을 주지 않음

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
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => {
        item.id.toString();
      }}
      // windowSize={21} // 이전 화면 10개 / 현재화면 1개 / 다음 화면 10개
      // 값이 작으면 메모리 절약, 값이 작으면 빈 화면이 나올 사능성이 있음

      windowSize={5} // 이전 화면 2개 / 현재화면 1개 / 다음 화면 2개
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
