import { useState } from "react";
import { FlatList, HStack, Heading, VStack, Text } from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";

export function Home() {
  const groups = [
    'costas',
    'peito',
    'ombro',
    'bíceps/tríceps',
    'pernas',
  ];

  const [group, setGroup] = useState(groups);
  const [groupSelected, setGroupSelected] = useState('costa');

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
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

    </VStack>
  );
};
