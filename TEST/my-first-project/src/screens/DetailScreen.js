import { StyleSheet, Text, View, Button } from "react-native";

const DetailScreen = ({ route, navigation }) => {
  console.log({ route });
  return (
    <View tyle={styles.container}>
      <Text style={styles.title}>Detail</Text>
      {/* 
        {route.param ? (
          <Text style={styles.text}>id : {route.params?.id}</Text>
        ) : (
          <Text style={styles.text}>id가 존재하지 않습니다.</Text>
        )} 
      */}

      <Text style={styles.text}>
        {route.params ? "ID : " + route.params.id : "데이터 존재하지 않음"}
      </Text>
      <View style={styles.button}>
        {route.params ? (
          <Button
            title="다음"
            onPress={() =>
              navigation.push("Detail", { id: route.params.id + 1 })
            }
          />
        ) : (
          <></>
        )}
        <Button title="뒤로가기" onPress={() => navigation.pop()} />
        <Button title="처음으로" onPress={() => navigation.popToTop()} />
      </View>
    </View>
  );
};

{
  /**
console.log({ route }) = 
Detail 1 클릭시 => {"route": {"key": "Detail-EPJRiVieM-En-RQrzwFmF", "name": "Detail", "params": undefined, "path": undefined}}
Detail 2 or 3 클릭시 => {"route": {"key": "Detail-uE7wTUJ7Pncsz5FhN9X74", "name": "Detail", "params": {"id": 3}, "path": undefined}}
*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
  },
});
export default DetailScreen;
