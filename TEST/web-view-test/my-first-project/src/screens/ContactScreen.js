import React from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import * as Contacts from "expo-contacts";
import { useNavigation } from "@react-navigation/native";

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
    // Navigate to another screen with the contact's phone number.
    navigation.navigate("Test", {
      phoneNumber: contact.phoneNumbers[0].number,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {contacts.map((contact) => (
        <View
          key={contact.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 30,
          }}
        >
          <TouchableOpacity onPress={() => handleContactClick(contact)}>
            <Text style={{ marginRight: 10 }}>
              {contact.name} - {contact.phoneNumbers[0].number}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCall(contact.phoneNumbers[0].number)}
          >
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              CALL
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
