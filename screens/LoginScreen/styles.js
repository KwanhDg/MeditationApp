import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 20,
      padding: 20,
    },
    vector1: {
      position: 'absolute',
      left: -10,
      top: -5,
    },
    vector2: {
      position: 'absolute',
      right: -6,
    },
    vector3: {
      position: 'absolute',
      top: 90,
    },
    vector4: {
      position: 'absolute',
      right: 0,
      top: 90,
    },
    contentContainer: {
      flex: 1,
    },
    back: {
      marginTop: 50,
    },
    heading: {
      fontFamily: 'HelveticaNeue',
      fontWeight: '700',
      fontSize: 30,
      lineHeight: 41,
      textAlign: 'center',
      color: '#3F414E',
    },
    btnContainer: {
      marginTop: 30,
    },
    btnWrapperItem: {
      marginBottom: 20,
    },
    or: {
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 20,
      fontFamily: 'HelveticaNeue',
      fontSize: 14,
      fontWeight: '700',
      lineHeight: 40,
      color: '#A1A4B2',
    },
    inputItem: {
      marginBottom: 20,
    },
    loginBtnWrapper: {
      marginTop: 10,
    },
    forgotPassword: {
      fontFamily: 'HelveticaNeue',
      fontWeight: '400',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 20,
      color: '#3F414E',
    },
    footerWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    footerText: {
      fontFamily: 'HelveticaNeue',
      fontWeight: '400',
      fontSize: 14,
    },
    footerText1: {
      color: '#A1A4B2',
    },
    footerText2: {
      color: '#8E97FD',
    },
  });