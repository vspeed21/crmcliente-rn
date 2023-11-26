// Navegation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Framework UI
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Views
import HomePage from './src/views/Home';
import DetallesCliente from './src/views/DetallesCliente';
import NuevoCliente from './src/views/NuevoCliente';


const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
  }
}

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Inicio'
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTitleStyle: {
              color: '#FFF',
              fontWeight: 'bold',
            }
          }}
        >
          <Stack.Screen
            name='Home'
            component={HomePage}
            options={({ navigation, route }) => ({
              headerTitle: 'Clientes',
              headerBackVisible: true,
              headerTitleAlign: 'center',
              // headerLeft: (props) => <BarraSuperior {...props} navigation={navigation} route={route} />
            })}
          />

          <Stack.Screen
            name='nuevoCliente'
            component={NuevoCliente}
            options={{
              headerTitle: 'Nuevo Cliente',
              headerBackVisible: true,
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name='DetallesCliente'
            component={DetallesCliente}
            options={{
              headerTitle: 'Detalles del cliente',
              headerBackVisible: true,
              headerTitleAlign: 'center',
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
