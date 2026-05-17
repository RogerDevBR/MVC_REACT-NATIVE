import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './CommonStyles';
import { RootStackParamList } from '../types/navigation';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'MenuView'>;
};

export default function MenuView({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('StudentView')}
            >
                <Text style={styles.buttonTextBig}>Alunos</Text>
            </TouchableOpacity>
        </View>
    );
}
