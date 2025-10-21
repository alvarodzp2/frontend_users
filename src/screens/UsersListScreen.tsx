import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getUsers, deleteUser } from '../services/usersService';
import listStyles from '../styles/listStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function UsersListScreen({ navigation }: any) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const insets = useSafeAreaInsets();
  const fabBottom = insets.bottom + 15; // posición segura del botón

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Confirmar', '¿Seguro que deseas eliminar este usuario?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteUser(id);
            loadUsers();
          } catch {
            Alert.alert('Error', 'No se pudo eliminar el usuario');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadUsers);
    return unsubscribe;
  }, [navigation]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  const renderEmpty = () => (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <Text style={{ fontSize: 16, color: '#6c757d' }}>
        No hay usuarios registrados. ¡Crea uno!
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => (
    <View style={listStyles.userCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate('UserForm', { userId: item.id })}
      >
        <Text style={listStyles.name}>
          {(item.first_name ?? '') + ' ' + (item.last_name ?? '')}
        </Text>
        <Text style={listStyles.email}>{item.email ?? ''}</Text>
        <Text style={listStyles.phone}>{item.phone ?? ''}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={listStyles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={listStyles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={listStyles.container}>
      <FlatList
        data={users}
        keyExtractor={(item: any) => item.id}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ paddingBottom: fabBottom + 70 }}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={[listStyles.addButton, { bottom: fabBottom }]}
        onPress={() => navigation.navigate('UserForm')}
      >
        <Text style={listStyles.addButtonText}>+ Crear Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}
