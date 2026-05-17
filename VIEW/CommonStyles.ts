import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
        width: '100%',
    },
    itensContainer: {
        marginTop: 10,
        padding: 20,
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    button: {
        margin: 10,
        height: 60,
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonTextBig: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textItem: {
        fontSize: 16,
    },
    input: {
        marginTop: 10,
        height: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
    },
});
