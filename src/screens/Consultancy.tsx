import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {  HStack, Heading, VStack, useToast, Icon } from "native-base";

import { api } from '@services/api';
import { AppError } from "@utils/APPERROR";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Feather } from '@expo/vector-icons';

import { Loading } from "@components/Loading";
import { TouchableOpacity } from "react-native";

export function Consultancy() {
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('antebraço');

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

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
      {
        isLoading ? <Loading /> :
       <>
        <VStack flex={1} px={8} mt={50}>
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
                color='green.500'
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
                Assessoria
              </Heading>
            </HStack>
          </VStack>
        </VStack>
      </>
      }
    </VStack>
  );
};
