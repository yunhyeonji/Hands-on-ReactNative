import { StyleSheet, Text, View } from "react-native";

const DetailScreen = ({ route }) => {
  console.log({ route });
  return (
    <View>
      <Text style={styles.container}>Detail</Text>
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
    fontSize: 30,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
export default DetailScreen;
