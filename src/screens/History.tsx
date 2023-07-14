import { useState } from "react";
import { Heading, VStack, SectionList } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";

const lastExercises = [
  {
    title: '26.08.23',
    data: ['Puxada frontal', 'Remada unilateral']
  },
  {
    title: '27.08.23',
    data: ['Supino reto']
  },
];

export function History() {
  const [sectionExercises, setSectionExercises] = useState(lastExercises);

  return (
    <VStack flex={1}>
      <ScreenHeader
        title='Histórico de Exercícios'
      />

      <SectionList
        sections={sectionExercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading
            color='gray.200'
            fontSize='md'
            mt={10}
            mb={3}
          >
            {section.title}
          </Heading>
        )}
        px={8}
      />
      
    </VStack>
  );
};
