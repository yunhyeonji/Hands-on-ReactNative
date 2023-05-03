import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';

const HeaderLeftButton = ({ canGoBack, tintColor }) => {
  const navigation = useNavigation();

  if (!canGoBack) {
    return null;
  }

  return (
    <Pressable onPress={navigation.goBack} hitSlop={10}>
      <MaterialCommunityIcons name="chevron-left" size={30} color={tintColor} />
    </Pressable>
  );
};

HeaderLeftButton.prototypes = {
  canGoBack: PropTypes.bool,
  tintColor: PropTypes.string,
};

export default HeaderLeftButton;
