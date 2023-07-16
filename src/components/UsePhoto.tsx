import { Image, IImageProps } from "native-base";

type UsePhotoProps = IImageProps & {
  size: number;
};

export function UsePhoto({ size, ...rest }: UsePhotoProps) {
  return (
    <Image
    w={size}
    h={size}
    rounded='full'
    borderWidth={2}
    borderColor='gray.400'
    {...rest}
    />
  );
};