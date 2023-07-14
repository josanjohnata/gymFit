import { useState } from "react";
import { FlatList, HStack, Heading, VStack, Text } from "native-base";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";

const groups = [
  'costas',
  'peito',
  'ombro',
  'bíceps/tríceps',
  'pernas',
];

const exercisesList = [
  'Puxada frontal',
  'Remada curvada',
  'Remada unilateral',
  'Levantamento terra',
]

export function Home() {
  const [group, setGroup] = useState(groups);
  const [exercises, setExercises] = useState(exercisesList)
  const [groupSelected, setGroupSelected] = useState('costas');

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={group}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        renderItem={({item}) => (
          <Group
            name={item}
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent='space-between' mb={5}>
          <Heading color='gray.200' fontSize='md'>
            Exercícios
          </Heading>

          <Text color='gray.200' fontSize='sm'>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
};
