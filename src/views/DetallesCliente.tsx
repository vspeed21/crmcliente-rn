import { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, Headline, Subheading, Text, Portal, Dialog, Paragraph } from 'react-native-paper';
import globlalStyles from '../styles/globals';
import axios from 'axios';

interface Props {
  navigation: any
  route: any
}

function DetallesCliente({ route, navigation }: Props) {
  const [alerta, setAlerta] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const { nombre, empresa, correo, celular, id } = route.params.item;

  async function eliminarCliente() {
    setEliminando(true);

    try {
      const url = `http://192.168.100.12:3000/clientes/${id}`;
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    } finally {
      setEliminando(false);
      setAlerta(false);
    }

    navigation.navigate('Home');
    route.params.setConsultarClientes(true);

  }

  return (
    <View style={globlalStyles.contenedor}>
      <Headline style={globlalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>Empresa: <Subheading style={{ fontWeight: 'normal' }}>{empresa}</Subheading></Text>
      <Text style={styles.texto}>Correo: <Subheading style={{ fontWeight: 'normal' }}>{correo}</Subheading></Text>
      <Text style={styles.texto}>Celular: <Subheading style={{ fontWeight: 'normal' }}>{celular}</Subheading></Text>

      <View style={styles.buttons}>
        <Button onPress={() => {
          navigation.navigate('nuevoCliente', { clienteEditar: route.params.item, setConsultarClientes: route.params.setConsultarClientes });
        }} icon='pencil' mode='contained' buttonColor='rgb(96 165 250)'>
          Editar
        </Button>

        <Button onPress={() => setAlerta(true)} icon='trash-can' mode='contained' buttonColor='rgb(220 38 38)'>
          Eliminar
        </Button>
      </View>

      <Portal>
        <Dialog visible={alerta}>
          <Dialog.Title>Eliminar Cliente: {nombre}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              ¿Esta seguro de eliminar este cliente?Esta acción no se podra deshacer
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button disabled={eliminando} onPress={() => setAlerta(false)}>Cancelar</Button>
            <Button disabled={eliminando} loading={eliminando} onPress={() => eliminarCliente()}>
              {eliminando ? 'Eliminando...' : 'Si, eliminar'}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  }
});

export default DetallesCliente;
