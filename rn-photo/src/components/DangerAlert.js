import { StyleSheet, Modal, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK } from '../colors';

const DangerAlert = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={onClose} // 뒤로가기 버튼이 있는 안드로이드에서 사용 -> 뒤로가기 버튼을 눌렀을때
    >
      <Pressable onPress={onClose} style={styles.background}></Pressable>
    </Modal>
  );
};
DangerAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BLACK,
    opacity: 0.3,
  },
});

export default DangerAlert;
