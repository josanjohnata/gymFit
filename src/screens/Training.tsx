import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, HStack, Heading, VStack, Text, useToast, Icon } from "native-base";

import { api } from '@services/api';
import { AppError } from "@utils/APPERROR";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Feather } from '@expo/vector-icons';

import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";
import { Loading } from "@components/Loading";
import { TouchableOpacity } from "react-native";

export function Training() {
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('antebraço');

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleOpenExerciseDetails = (exerciseId: string) => {
    navigation.navigate('exercise', { exerciseId })
  };

  const fetchGroups = async () => {
    try {
      const response = await api.get('/groups');
      setGroup(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi passível carregar os grupos musculares.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  const fetchExercisesByGroup = async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi passível carregar os exercícios.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup();
  }, [groupSelected]));

  return (
    <VStack flex={1}>
      <VStack
        px={8}
        bg='gray.600'
        pt={12}
      >
        <TouchableOpacity
          onPress={handleGoBack}
        >
          <Icon as={Feather}
            name='arrow-left'
            color='blue.500'
            size={6}
          />
        </TouchableOpacity>

        <HStack
          justifyContent='space-between'
          alignItems='center'
          mt={4}
          mb={8}
        >
          <Heading
            color='gray.100'
            fontSize='lg'
            flexShrink={1}
            fontFamily='heading'
          >
            Treino
          </Heading>
        </HStack>
      </VStack>

      <FlatList
        data={group}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
        renderItem={({item}) => (
          <Group
            name={item}
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      {
        isLoading ? <Loading /> :
        <VStack flex={1} px={8}>
          <HStack justifyContent='space-between' mb={5}>
            <Heading
              color='gray.200'
              fontSize='md'
              fontFamily='heading'
            >
              Exercícios
            </Heading>

            <Text color='gray.200' fontSize='sm'>
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(item.id)}
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      }
    </VStack>
  );
};
