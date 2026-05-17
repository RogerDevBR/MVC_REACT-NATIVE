import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Student } from '../MODEL/Student';
import { styles } from './CommonStyles';

type Props = {
    aluno: Student;
    onDelete: () => void;
};

export default function StudentItem({ aluno, onDelete }: Props) {
    const fillZero = (num: number): string => ((num < 10) ? '0' : '') + num;

    const getStrDate = (date: Date): string =>
        fillZero(date.getDate()) + '/' +
        fillZero(date.getMonth() + 1) + '/' +
        date.getFullYear();

    return (
        <View style={[styles.container, { flexDirection: 'row', alignItems: 'center', padding: 10 }]}>
            <View style={{ flex: 1 }}>
                <Text style={styles.textItem}>
                    {aluno.matricula} - {aluno.nome}
                </Text>
                <Text style={styles.textItem}>
                    Cadastro: {getStrDate(new Date(aluno.registro))}
                </Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
        </View>
    );
}
