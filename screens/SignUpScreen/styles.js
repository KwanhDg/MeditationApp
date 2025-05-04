import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    scrollContent: {
      padding: 20,
      flexGrow: 1,
      paddingBottom: 20,
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
    privacyPolicyCheckWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    checkBox: {
      width: 24,
      height: 24,
    },
    subTitle: {
      fontFamily: 'HelveticaNeue',
      fontSize: 14,
      color: '#A1A4B2',
    },
    link: {
      fontFamily: 'HelveticaNeue',
      fontSize: 14,
      color: '#8E97FD',
    },
    privacyPolicyLabelWrapper: {
      flexDirection: 'row',
    },
    startedBtnWrapper: {
      marginTop: 30,
      marginBottom: 20,
    },
  });