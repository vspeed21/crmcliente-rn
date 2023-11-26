import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TextInput, Button, Headline, Paragraph, Dialog, Portal } from 'react-native-paper';

import axios from 'axios';

import globlalStyles from '../styles/globals';
import { StackActions } from '@react-navigation/native';

interface Props {
  navigation: any
  route: any
}

function NuevoCliente({ navigation, route }: Props) {
  const [nombre, setNombre] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [alerta, setAlerta] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idCliente, setIdCliente] = useState('');

  useEffect(() => {
    if (route.params.clienteEditar) {
      const { nombre, empresa, correo, celular, id } = route.params.clienteEditar;
      setNombre(nombre);
      setCelular(celular);
      setCorreo(correo);
      setEmpresa(empresa);
      setIdCliente(id);
    }
  }, [route.params.clienteEditar]);

  const handleGuardarCliente = async () => {
    // Validar campos
    if ([nombre, celular, correo, empresa].every(e => e == '')) {
      setAlerta(true);
      return;
    }

    // cliente
    const cliente = {
      id: Date.now(),
      nombre,
      celular,
      correo,
      empresa,
    }

    // Guardar en la API el cliente
    setLoading(true);
    try {
      if (idCliente) {
        cliente.id = Number(idCliente);
        console.log(cliente);
        await axios.put(`http://192.168.100.12:3000/clientes/${idCliente}`, cliente);
      } else {
        await axios.post('http://192.168.100.12:3000/clientes', cliente);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    navigation.navigate('Home');

    // Reset campos del form
    setNombre('');
    setCelular('');
    setCorreo('');
    setEmpresa('');
    setIdCliente('');

    //
    route.params.setConsultarClientes(true);

  }

  return (
    <View style={globlalStyles.contenedor}>
      <Headline
        style={globlalStyles.titulo}
      >
        {idCliente ? `Editar Cliente: ${route.params.clienteEditar.nombre}` : 'Añadir Nuevo Cliente'}
      </Headline>

      <ScrollView>
        <TextInput
          label='Nombre'
          placeholder='Ej: Victor Torres'
          style={styles.input}
          onChangeText={setNombre}
          value={nombre}
        />

        <TextInput
          label='Celular'
          placeholder='123456789'
          style={styles.input}
          onChangeText={setCelular}
          value={celular}
          keyboardType='numeric'
        />

        <TextInput
          label='Correo'
          placeholder='correo@correo.com'
          style={styles.input}
          onChangeText={setCorreo}
          value={correo}
          keyboardType='email-address'
        />

        <TextInput
          label='Empresa'
          placeholder='Meta'
          style={styles.input}
          onChangeText={setEmpresa}
          value={empresa}
        />

        <Button
          icon='pencil-circle'
          mode='contained'
          style={{ marginBottom: 10 }}
          onPress={handleGuardarCliente}
          loading={loading}
          disabled={loading}
        >
          {idCliente ? 'Guardar Cambios' : 'Guardar Cliente'}
        </Button>
      </ScrollView>

      <Portal>
        <Dialog visible={alerta}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlerta(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
  )
}

export default NuevoCliente

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  }
});