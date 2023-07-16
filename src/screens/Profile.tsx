import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHeader';
import { UsePhoto } from '@components/UsePhoto';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

const PHOTO_SIZE = 33;
const PHOTO_DEFAULT_PROFILE = 'data:image/jpeg;base64,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';

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(PHOTO_DEFAULT_PROFILE);

  const toast = useToast();

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true);
      
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
  
      if(photoSelected.canceled) return;

      if(photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
console.log(photoInfo);

        if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 10) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 10MB.',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  return (
    <VStack flex={1}>
      <ScreenHeader
        title='Perfil'
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center
          mt={6}
          px={10}
        >
          {
            photoIsLoading ?
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded='full'
              startColor='gray.400'
              endColor='gray.500'
            />
            :
            <UsePhoto
              source={{ uri: userPhoto }}
              alt='Imagem do usuário'
              size={PHOTO_SIZE}
            />
          }
          <TouchableOpacity
            onPress={handleUserPhotoSelect}
          >
            <Text
              color='green.500'
              fontWeight='bold'
              fontSize='md'
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            bg='gray.600'
            placeholder='Nome'
          />

          <Input
            bg='gray.600'
            value='josanjohnata@gmail.com'
            isDisabled
          />

          <Heading
            color='gray.200'
            fontSize='md'
            mb={2}
            mt={12}
            alignSelf='flex-start'
          >
            Alterar senha
          </Heading>

          <Input
            bg='gray.600'
            placeholder='Senha antiga'
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholder='Nova senha'
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholder='Confirme a nova senha'
            secureTextEntry
          />

          <Button
            title='Atualizar'
            mt={4}
          />

        </Center>
      </ScrollView>
    </VStack>
  );
};
