import { TouchableOpacity } from 'react-native';
import { HStack, VStack, Heading, Text, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { UsePhoto } from './UsePhoto';

export function HomeHeader() {
  return (
    <HStack
      bg='gray.600'
      pt={16}
      pb={6}
      px={8}
      alignItems='center'
    >
      <UsePhoto
      source={{ uri: 'https://github.com/josanjohnata.png' }}
      alt='Imagem do usuário'
      size={16}
      mr={4}
      />
      <VStack flex={1}>
        <Text
          color='gray.100'
          fontSize='md'
        >
          Olá,
        </Text>

        <Heading
          color='gray.100'
          fontSize='md'
        >
          Josan Johnata
        </Heading>
      </VStack>
      
      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name='logout'
          color='gray.200'
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  );
};