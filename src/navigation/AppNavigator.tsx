// frontend/src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersListScreen from '../screens/UsersListScreen';
import UserFormScreen from '../screens/UserFormScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
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
