import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  View,
  Platform,
  Pressable,
  Keyboard,
} from 'react-native';
import Input, { keyboardTypes, ReturnKeyTypes } from '../components/input';

const TestAvoid = () => {
  return (
    <KeyboardAvoidingView
      style={styles.avoid}
      behavior={Platform.select({ ios: 'position' })}
      constentContainerSytyle={{ flex: 1 }}
    >
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <View style={[styles.view, { backgroundColor: '#047857' }]}>
          <Image
            source={require('../../assets/main.png')}
            styles={styles.image}
            resizeMode={'cover'}
          ></Image>
        </View>
        <View style={[styles.view, { backgroundColor: '#0369a1' }]}>
          <Input
            title={'email'}
            placeholder={'your@email.com'}
            keyboardType={keyboardTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
          />
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avoid: { flex: 1 },
  view: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 200, height: 200 },
});

export default TestAvoid;
