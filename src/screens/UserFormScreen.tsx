import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createUser, getUserById, updateUser } from '../services/usersService';
import formStyles from '../styles/formStyles';

// Función de utilidad para validar el formato de email
const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default function UserFormScreen({ navigation, route }: any) {
  const userId = route.params?.userId;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cedula, setCedula] = useState('');

  useEffect(() => {
    if (userId) {
      getUserById(userId).then(u => {
        setFirstName(u.first_name);
        setLastName(u.last_name);
        setEmail(u.email);
        setPhone(u.phone || '');
        setCedula(u.cedula || '');
      });
    }
  }, [userId]);

  // Manejador de cambio para campos numéricos con límite de 10 dígitos
  // AHORA: Filtra comas, puntos y cualquier NO-dígito.
  const handleNumericChange = (text: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
    // 1. Filtrar: Eliminar cualquier caracter que NO sea un dígito (incluyendo , y .)
    const cleanText = text.replace(/[^0-9]/g, '');

    // 2. Aplicar la lógica de límite de 10 dígitos al texto limpio
    if (cleanText.length <= 10) {
      setState(cleanText);
    } 
    // 3. Opcional: Notificar si el usuario intenta pegar un texto más largo de 10 dígitos
    else if (cleanText.length > 10) {
        setState(cleanText.slice(0, 10)); // Establecer solo los primeros 10
        Alert.alert('Límite de dígitos', 'El campo solo permite 10 dígitos.');
    }
  };

  const handleSubmit = async () => {
    // ... (Validación de campos obligatorios)
    if (!firstName || !lastName || !email || !phone || !cedula) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    
    // 1. Validar formato de Email
    if (!validateEmail(email)) {
      Alert.alert('Error de validación', 'Por favor, ingresa un formato de correo electrónico válido.');
      return;
    }

    // 2. Validar longitud de Teléfono y Cédula (debe ser exacta)
    if (phone.length !== 10) {
      Alert.alert('Error de validación', 'El Teléfono debe tener exactamente 10 dígitos.');
      return;
    }
    if (cedula.length !== 10) {
      Alert.alert('Error de validación', 'La Cédula debe tener exactamente 10 dígitos.');
      return;
    }

    const user = { first_name: firstName, last_name: lastName, email, phone, cedula };

    try {
      if (userId) await updateUser(userId, user);
      else await createUser(user);
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'No se pudo guardar el usuario');
    }
  };

  return (
    <View style={formStyles.container}>
      <TextInput
        style={formStyles.input}
        placeholder="Nombre"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={formStyles.input}
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={formStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={formStyles.input}
        placeholder="Teléfono"
        value={phone}
        // Aplicamos el nuevo manejador de cambio con filtro
        onChangeText={(text) => handleNumericChange(text, setPhone)}
        keyboardType="numeric"
        maxLength={10} 
      />
      <TextInput
        style={formStyles.input}
        placeholder="Cédula"
        value={cedula}
        // Aplicamos el nuevo manejador de cambio con filtro
        onChangeText={(text) => handleNumericChange(text, setCedula)}
        keyboardType="numeric"
        maxLength={10} 
      />
      <TouchableOpacity style={formStyles.submitButton} onPress={handleSubmit}>
        <Text style={formStyles.submitButtonText}>{userId ? 'Actualizar' : 'Crear'}</Text>
      </TouchableOpacity>
    </View>
  );
}