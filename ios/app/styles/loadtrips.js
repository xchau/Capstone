import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const loadtrips = StyleSheet.create({
  spinnerBox: {
    backgroundColor: 'transparent',
    height: height * 0.6,
    flex: 1,
    justifyContent: 'center'
  },
  spinner: {
    top: 10,
    width: width
  }
})
