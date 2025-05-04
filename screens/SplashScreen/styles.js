import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        flex: 1,
    },
    bg: {
        position: 'absolute',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        marginTop: 30,
       
    },
    logo: {
        alignSelf: 'center',
    },
    welcomeImage: {
        marginTop: 50,
        marginLeft: 20
    },
    top: {
        flex: 1,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    heading: {
        fontFamily: 'HelveticaNeue',
        fontWeight: '700',
        fontSize: 30,
        lineHeight: 41,
        textAlign: 'center',
        color: '#3F414E',
    },
    subHeading: {
        fontFamily: 'HelveticaNeue',
        fontWeight: '300',
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'center',
        color: '#A1A4B2',
        
    },
    btnContainer: {
        display: 'flex',
        marginTop: 60,
    },
    btn: {
        backgroundColor: '#8E97FD',
        borderRadius: 38,
    },
    btnLabel: {
        fontFamily: 'HelveticaNeue',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        color: '#F6F1FB',
        padding: 20,
    },
    loginLinkWrapper: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 90,
    },
    notificationContent: {
        color: '#A1A4B2',
        fontSize: 14,
        fontFamily: 'HelveticaNeue',
    },
    link: {
        color: '#8E97FD',
        fontSize: 14,
        fontFamily: 'HelveticaNeue',
    },
    });