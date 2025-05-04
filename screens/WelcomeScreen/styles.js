import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#8E97FD',
    },
    logoWrapper: {
      marginTop: 30,
    },
    logoImage: {
      alignSelf: 'center',
    },
    welcomeMessage: {
      marginTop: 75,
    },
    heading: {
      fontFamily: 'HelveticaNeue',
      fontSize: 30,
      color: '#EBEAEC',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subHeading: {
      fontFamily: 'HelveticaNeue',
      fontSize: 30,
      color: '#EBEAEC',
      marginTop: 10,
      textAlign: 'center',
      fontWeight: 'ultralight',
    },
    description: {
      textAlign: 'center',
      color: '#EBEAEC',
      marginTop: 15,
      marginLeft: 20,
      marginRight: 20,
      fontSize: 16,
      lineHeight: 20,
    },
    welcomeImageWrapper: {
      position: 'absolute',
      bottom: '5%',
    },
    yoga: {
      position: 'absolute',
      top: '11%',
      alignSelf: 'center',
    },
    btnContainer: {
      marginTop: 30,
    },
    btnStarted: {
      borderRadius: 38,
      flexDirection: 'row',
      backgroundColor: '#EBEAEC',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnStartedLabel: {
      fontFamily: 'HelveticaNeue',
      textAlign: 'center',
      fontSize: 14,
      fontWeight: '400',
      padding: 20,
      alignSelf: 'center',
      color: '#3F414E',
    },
    bgWrapper: {
      position: 'absolute',
      bottom: '10%',
      width: '90%',
      alignSelf: 'center',
    },
    bgBtn: {
      //backgroundColor: '#8C96FF',
      height: '35%',
      bottom: 0,
      width: '120%',
      position: 'absolute',
    },
  });