// frontend/src/styles/listStyles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 16, // Usamos padding horizontal aquí para que el FAB lo herede
    paddingTop: 16, // Mantenemos el padding superior para el contenido de la lista
    backgroundColor: '#f8f9fa' 
  },
  
  // BOTÓN DE ACCIÓN FLOTANTE (FAB)
  addButton: {
    backgroundColor: '#2ECC71', 
    padding: 16, // Aumentamos padding para mejor área de toque
    borderRadius: 8,
    alignItems: 'center',
    
    // PROPIEDADES CLAVE PARA POSICIONAMIENTO ABSOLUTO
    position: 'absolute', // Fija el botón
    bottom: 25, // Separación del borde inferior
    left: 16,  // Se alinea con el padding horizontal del contenedor
    right: 16, // Se alinea con el padding horizontal del contenedor
    zIndex: 10, // Asegura que esté por encima de la lista
    
    // Sombra para destacarlo como un FAB
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
  addButtonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 18, // Aumentamos el tamaño para el FAB
    textTransform: 'uppercase', // Opcional, pero le da jerarquía
  },
  
  // ... (Estilos de Tarjeta y Botón Eliminar sin cambios)
  userCard: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  name: { 
    fontSize: 18, 
    fontWeight: '700',
    marginBottom: 2,
    color: '#343a40',
  },
  email: { 
    color: '#6c757d',
    fontSize: 14,
    marginTop: 2,
  },
  phone: { 
    color: '#6c757d',
    fontSize: 14,
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    padding: 8,
    marginTop: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});