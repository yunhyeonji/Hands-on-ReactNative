import { StyleSheet, Modal, Pressable, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, WHITE, DANGER } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button, { ButtonTypes } from './Button';

export const AlertTypes = {
  SIGNOUT: 'SIGNOUT',
};

const DangerAlertProps = {
  SIGNOUT: {
    iconName: 'logout-variant',
    title: '로그아웃',
    message: '정말 로그아웃 하시겠습니까?',
  },
};

const DangerAlert = ({ visible, onClose, onConfirm, alertType }) => {
  const { iconName, title, message } = DangerAlertProps[alertType];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={onClose} // 뒤로가기 버튼이 있는 안드로이드에서 사용 -> 뒤로가기 버튼을 눌렀을때
    >
      <View style={styles.container}>
        <Pressable onPress={onClose} style={styles.background}></Pressable>

        <View style={styles.alert}>
          <View style={styles.iconBackground}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name={iconName} size={35} color={WHITE} />
            </View>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.bottonContainer}>
            <Button
              title={'취소'}
              onPress={onClose}
              styles={buttonStyles}
              buttonType={ButtonTypes.CANCEL}
            ></Button>
            <Button
              title={'확인'}
              onPress={onConfirm}
              styles={buttonStyles}
              buttonType={ButtonTypes.DANGER}
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
DangerAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  alertType: PropTypes.oneOf(Object.values(AlertTypes)),
};
const buttonStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  button: {
    borderRadius: 8,
  },
});

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BLACK,
    opacity: 0.3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: WHITE,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20,
    width: '80%',
    borderRadius: 8,
  },
  iconBackground: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: WHITE,
    top: -40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: DANGER.DEFAULT,
    width: 74,
    height: 74,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 50,
  },
  message: {
    fontSize: 16,
    marginVertical: 10,
  },
  bottonContainer: {
    width: '100%',
    flexDirection: 'row',
  },
});

export default DangerAlert;
