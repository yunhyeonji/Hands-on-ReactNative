import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, PRIMARY } from '../colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_API_KEY } from '../../env';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LocationSearch = ({ styles, onPress, isLoading, isSelected }) => {
  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <GooglePlacesAutocomplete
        placeholder="location"
        query={{ key: MAP_API_KEY, language: 'ko' }}
        onPress={onPress}
        onFail={(e) => {
          // eslint-disable-next-line no-console
          console.log('GooglePlaceAutocomplete : ', e);
        }}
        styles={{ container: { flex: 0 }, textInput: { paddingLeft: 30 } }}
        debounce={400}
        enablePoweredByContainer={false}
        textInputProps={{ editable: !isLoading }}
      />
      <View style={[defaultStyles.icon, styles?.icon]}>
        <MaterialCommunityIcons
          name="map-marker"
          size={20}
          color={isSelected ? PRIMARY.DEFAULT : GRAY.DARK}
        />
      </View>
    </View>
  );
};

LocationSearch.propTypes = {
  styles: PropTypes.object,
  onPress: PropTypes.func,
  isLoading: PropTypes.bool,
  isSelected: PropTypes.bool,
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottom: 0.5,
    borderBottomColor: GRAY.LIGHT,
  },
  icon: {
    position: 'absolute',
    left: 20,
    top: 16,
  },
});

export default LocationSearch;
