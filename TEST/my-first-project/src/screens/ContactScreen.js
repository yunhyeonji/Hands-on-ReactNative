import React from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contacts, setContacts] = React.useState([]);

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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {contacts.map((contact) => (
        <TouchableOpacity
          key={contact.id}
          style={{ padding: 30 }}
          onPress={() => handleCall(contact.phoneNumbers[0].number)}
        >
          <Text>
            {contact.name} - {contact.phoneNumbers[0].number}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
