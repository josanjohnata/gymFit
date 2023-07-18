import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type InputComponentProps = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: InputComponentProps) {
  const inputInvalid = !!errorMessage || isInvalid;

  return (
    <FormControl
      isInvalid={inputInvalid}
      mb={4}
    >
      <NativeBaseInput
        bg='gray.700'
        h={14}
        px={4}
        borderWidth={0}
        fontSize='md'
        color='white'
        fontFamily='body'
        placeholderTextColor='gray.300'
        isInvalid={inputInvalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500'
        }}
        _focus={{
          bg:'gray.700',
          borderWidth: 1,
          borderColor: 'green.500'
        }}
        { ...rest }
      />
      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};