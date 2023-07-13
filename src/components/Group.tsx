import { Text, Pressable, IPressableProps, Box } from "native-base";

type GroupProps = IPressableProps & {
  name: string;
  isActive: boolean;
};

export function Group({ name, isActive, ...rest }: GroupProps) {
  return (
    <Pressable
      mr={13}
      w={24}
      h={10}
      backgroundColor='gray.600'
      rounded='md'
      overflow='hidden'
      isPressed={isActive}
      _pressed={{
        borderWidth: 1,
        borderColor: 'green.500'
      }}
      {...rest}
    >
      <Text
        color={isActive? 'green.500' : 'gray.200'}
        textTransform='uppercase'
        size='xs'
        fontWeight='bold'
      >
        {name}
      </Text>
    </Pressable>
  );
};