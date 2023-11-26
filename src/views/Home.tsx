import axios from 'axios';

import { useEffect, useState } from 'react';
import { ParamListBase, RouteProp } from '@react-navigation/native';

import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Headline, List, FAB } from 'react-native-paper';

import { Cliente } from '../interfaces/clientes';
import globlalStyles from '../styles/globals';

interface Props {
  navigation: any
  route: RouteProp<ParamListBase>
}

function HomePage({ navigation }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [consultarClientes, setConsultarClientes] = useState<boolean>(true);

  useEffect(() => {
    const getClientes = async () => {
      try {
        const { data } = await axios('http://192.168.100.12:3000/clientes');
        setClientes(data);
      } catch (error) {
        console.log(error);
      } finally {
        // TODO: setLoading false
        setConsultarClientes(false);
      }
    }
    if (consultarClientes) {
      getClientes();
    }

  }, [consultarClientes]);

  function handlePressNewClient() {
    navigation.navigate('nuevoCliente', { setConsultarClientes });
  }

  return (
    <View style={globlalStyles.contenedor}>

      <Headline style={globlalStyles.titulo}>Clientes</Headline>

      <Button style={{ marginTop: -15 }} icon='plus-circle' onPress={handlePressNewClient}>
        Nuevo Cliente
      </Button>

      <FlatList
        data={clientes}
        keyExtractor={cliente => cliente.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress={() => {
              navigation.navigate('DetallesCliente', { item, setConsultarClientes });
            }}
          />
        )}
      />

      <FAB
        icon='plus'
        onPress={handlePressNewClient}
        style={styles.fab}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10,
  }
})

export default HomePage;
