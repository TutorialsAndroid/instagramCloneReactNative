/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  toolbar: {
    backgroundColor: 'white',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbarTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toolbarLogo: {
    width: 110,
    height: 55,
    resizeMode: 'contain',
    marginStart: 16,
  },
  toolbarButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 16,
  },
  button: {
    marginStart: 16,
  },
});

export default styles;
