import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f8f9fa' 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16, // Aumento de espacio
    backgroundColor: 'white',
    fontSize: 16,
  },

  submitButton: { 
    backgroundColor: '#2ECC71', // Verde como el botón de la lista
    padding: 14, // Padding generoso
    borderRadius: 8, // Bordes redondeados
    alignItems: 'center', // Centrar texto
    marginTop: 10,
    // Sombra para que se vea como un botón real
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  submitButtonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 18, 
    textTransform: 'uppercase',
  },
});