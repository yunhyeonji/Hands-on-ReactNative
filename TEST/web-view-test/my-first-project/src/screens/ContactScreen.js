import React from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  const [contacts, setContacts] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    getContactsAsync();
  }, []);

  const getContactsAsync = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    }
  };

  const handleCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  const handleContactClick = (contact) => {
    console.log(contact.phoneNumbers[0].number);
    navigation.navigate("Test", {
      phoneNumber: contact.phoneNumbers[0].number,
    });
  };

  return (
    <FlatList
      data={contacts}
      keyExtractor={(contact) => contact.id.toString()}
      renderItem={({ item: contact }) => (
        <View style={styles.contactItem}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              style={{ paddingRight: 20 }}
              name="contacts"
              size={35}
              color="black"
            />
            <TouchableOpacity onPress={() => handleContactClick(contact)}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactName}>
                {contact.phoneNumbers[0].number}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleCall(contact.phoneNumbers[0].number)}
          >
            <Text style={styles.callButton}>CALL</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#A9D0F5", // 배경색 지정
    marginBottom: 8,
    borderRadius: 8, // 둥근 테두리
    marginHorizontal: 15,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    color: "#333", // 텍스트 색상 지정
  },
  callButton: {
    color: "#007BFF", // CALL 버튼 색상 지정
    textDecorationLine: "underline",
  },
});
