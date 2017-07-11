import { StyleSheet } from 'react-native';

export const AppStyles = StyleSheet.create({
  /*backCover:{
    position: 'absolute',
    marginTop: 20,
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor: "#ffffff",
  }*/
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  announcement: {
    backgroundColor: '#ffffff',
    borderRadius: 0,
    margin: 0,
    marginTop: 2,
    marginBottom: 0,
    padding: 20
  },
});

export const AppTextStyles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "500"
  },
  bold: {
    fontWeight: "500"
  }
});
