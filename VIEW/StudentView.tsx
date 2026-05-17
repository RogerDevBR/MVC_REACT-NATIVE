import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import StudentController from '../CONTROLLER/StudentController';
import StudentItem from './StudentItem';
import { Student } from '../MODEL/Student';
import { styles } from './CommonStyles';
import { RootStackParamList } from '../types/navigation';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'StudentView'>;
};

const controller = new StudentController();

export default function StudentView({ navigation }: Props) {
    const [students, setStudents] = useState<Student[]>([]);
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        controller.getAll(objs => setStudents(objs));
    }, [isFocused]);

    function excludeStudent(matriculaExc: string) {
        controller.exclude(matriculaExc).then(() =>
            controller.getAll(objs => setStudents(objs))
        );
    }

    function addStudent() {
        if (!matricula.trim() || !nome.trim()) return;
        const studentAux = new Student(matricula.trim(), nome.trim(), new Date());
        controller.include(studentAux).then(result => {
            if (result) {
                setMatricula('');
                setNome('');
                controller.getAll(objs => setStudents(objs));
            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={{ padding: 10 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Matrícula"
                    value={matricula}
                    onChangeText={setMatricula}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <TouchableOpacity style={styles.button} onPress={addStudent}>
                    <Text style={styles.buttonTextBig}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={students}
                contentContainerStyle={styles.itensContainer}
                keyExtractor={item => item.matricula}
                renderItem={({ item }) => (
                    <StudentItem
                        aluno={item}
                        onDelete={() => excludeStudent(item.matricula)}
                    />
                )}
            />
        </View>
    );
}
