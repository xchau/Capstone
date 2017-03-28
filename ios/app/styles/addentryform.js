import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  sceneContainer: {
    height: height,
    width: width
  },
  instructionBox1: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
    width: width
  },
  instructionBox2: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height: 50,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: width
  },
  formBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  inputRow: {
    height: 40,
    justifyContent: 'center',
    margin: 5,
    width: 300
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#2BFDAF',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 15,
    flex: 1,
    textAlign: 'center',
  },
  scrollViewContainer: {
    marginTop: 5
  },
  imageBox: {
    alignItems: 'center',
    height: 230,
    justifyContent: 'center',
    margin: 1,
    width: 250,
  },
  imageBoxSelected: {
    alignItems: 'center',
    borderWidth: 7,
    borderColor: '#4bee6f',
    height: 230,
    justifyContent: 'center',
    margin: 1,
    width: 250,
  },
  image: {
    height: 226,
    resizeMode: 'cover',
    width: 246,
  }
});
