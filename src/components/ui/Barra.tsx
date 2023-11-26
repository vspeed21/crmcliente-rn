import { RouteProp, ParamListBase } from '@react-navigation/native';
import { Button } from 'react-native-paper';

interface Props {
  navigation: any
  route: RouteProp<ParamListBase, "Home">
}

function BarraSuperior({ navigation, route }: Props) {
  const handlePress = () => {
    navigation.navigate('nuevoCliente');
  }

  return (
    <Button
      icon='plus-circle'
      textColor='#FFF'
      onPress={() => handlePress()}
    >
      Cliente
    </Button>
  );
}

export default BarraSuperior;