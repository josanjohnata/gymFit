import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, HStack, Heading, VStack, Text, useToast } from "native-base";

import { api } from '@services/api';
import { AppError } from "@utils/APPERROR";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { Button } from "@components/Button";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('antebraço');

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleOpenTraining = () => {
    navigation.navigate('training')
  };

  const handleOpenPhysicalAssessment = () => {
    navigation.navigate('physicalAssessment')
  };

  const handleOpenConsultancy = () => {
    navigation.navigate('consultancy')
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

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup();
  }, [groupSelected]));

  return (
    <VStack flex={1}>
      <HomeHeader />
      {
        isLoading ? <Loading /> :
       <>
        <VStack flex={1} px={8} mt={50}>
          <Button mt={50} title="Avaliação Física" onPress={() => handleOpenPhysicalAssessment()}/>

          <Button mt={50} title="Treino" onPress={() => handleOpenTraining()}/>

          <Button mt={50} title="Assessoria" onPress={() => handleOpenConsultancy()}/>
        </VStack>
      </>
      }
    </VStack>
  );
};
