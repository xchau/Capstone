import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    height: height,
    width: width
  },
});
