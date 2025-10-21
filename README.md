# gestión de usuarios con React Native (Expo) y Express

Este proyecto es una aplicación móvil simple de listado y gestión de usuarios  desarrollada utilizando React Native (con Expo) para el frontend 
## Estructura del Proyecto

```

.
└── frontend/
├── App.tsx              \# Componente principal y configuración de navegación
├── src/
│   ├── screens/
│   │   ├── UsersListScreen.tsx \# Pantalla principal, lista de usuarios, botón FAB
│   │   └── UserFormScreen.tsx  \# Pantalla de creación/edición de usuario
│   ├── services/
│   │   └── usersService.ts   \# Lógica de conexión y llamadas a la API (CRUD)
│   └── styles/
│       ├── listStyles.ts     \# Estilos para UsersListScreen
│       └── formStyles.ts     \# Estilos para UserFormScreen (asumiendo su existencia)
└── package.json

````

## Configuración y Ejecución Local

Para ejecutar esta aplicación, primero debe iniciar el servidor backend y luego el cliente frontend.

###  Configuración del Frontend (React Native - Expo)

El frontend debe saber dónde encontrar el backend. Esto se gestiona a través de la IP local de tu máquina, asignada a la variable de entorno `REACT_NATIVE_PACKAGER_HOSTNAME` en Windows.

1.  Abre otra terminal y navega a la carpeta del frontend:
    ```bash
    cd ..
    cd frontend
    ```

2.  Instala las dependencias, incluyendo las de navegación y seguridad:
    ```bash
    npm install
    # o si usas Expo: npx expo install react-native-screens @react-navigation/native @react-navigation/native-stack react-native-safe-area-context
    ```

3.  Configurar la Dirección IP Local:
    Antes de iniciar, debes obtener la dirección IPv4 de tu red local (generalmente 192.168.x.x) y establecerla.

    * **Paso A:** Ejecuta `ipconfig` en CMD y busca tu "Dirección IPv4" bajo tu adaptador de Wi-Fi o Ethernet (ej. 192.168.1.50).

    * **Paso B:** Establece la IP y lanza Expo (reemplaza `TU_IP_LOCAL`):
        ```bash
        set REACT_NATIVE_PACKAGER_HOSTNAME=TU_IP_LOCAL & npx expo start --host lan
        # Ejemplo: set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.50 & npx expo start --host lan
        ```

4.  Escanea el código QR con la aplicación **Expo Go** en tu dispositivo móvil (iOS o Android) para ver la aplicación en tu red local.

## Detalles de Implementación del Frontend

### `App.tsx`
Contiene la configuración del `Stack.Navigator` (`UsersList` y `UserForm`) y envuelve la aplicación en **`SafeAreaProvider`** para manejar correctamente las áreas de seguridad del dispositivo (esencial para el botón flotante).

### `UsersListScreen.tsx`
* Muestra la lista de usuarios.
* Utiliza `FlatList` para renderizar las tarjetas de usuario.
* Implementa el Botón de Acción Flotante (FAB) para navegar a la creación.
* Usa el hook **`useSafeAreaInsets`** de `react-native-safe-area-context` para asegurar que el FAB esté posicionado correctamente por encima de la barra de navegación de Android.
* Lógica para cargar y eliminar usuarios usando `usersService.ts`.

### `src/services/usersService.ts`
Contiene las funciones asíncronas para interactuar con la API backend. La URL base de la API debe estar configurada aquí (utilizando la misma `TU_IP_LOCAL` que se usó en `REACT_NATIVE_PACKAGER_HOSTNAME`).

// Ejemplo de configuración de la URL base en usersService.ts
const BASE_URL = 'http://TU_IP_LOCAL:3000/api/users'; 
// Reemplaza TU_IP_LOCAL (ej. [http://192.168.1.50:3000/api/users](http://192.168.1.50:3000/api/users))

### `src/styles/listStyles.ts`
Define los estilos CSS-in-JS para la pantalla de lista, incluyendo el posicionamiento **`absolute`** del `addButton` que se ajusta dinámicamente en `UsersListScreen.tsx`.

```
```
