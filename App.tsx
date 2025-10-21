// frontend/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersListScreen from './src/screens/UsersListScreen';
import UserFormScreen from './src/screens/UserFormScreen';

export type RootStackParamList = {
  UsersList: undefined;
  UserForm: { userId?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UsersList">
        <Stack.Screen
          name="UsersList"
          component={UsersListScreen}
          options={{ title: 'Usuarios' }}
        />
        <Stack.Screen
          name="UserForm"
          component={UserFormScreen}
          options={{ title: 'Formulario de Usuario' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
