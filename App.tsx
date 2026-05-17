import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuView from './VIEW/MenuView';
import StudentView from './VIEW/StudentView';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MenuView">
                <Stack.Screen
                    name="MenuView"
                    component={MenuView}
                    options={{ title: 'Menu Principal' }}
                />
                <Stack.Screen
                    name="StudentView"
                    component={StudentView}
                    options={{ title: 'Listagem de Alunos' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
