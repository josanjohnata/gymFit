import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { SignIn } from '@screens/Signin';
import { SignUp } from '@screens/SignUp';

type TAuthRoutes = {
  signIn: undefined;
  signUp: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<TAuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<TAuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='signIn'
        component={SignIn}
      />

      <Screen
        name='signUp'
        component={SignUp}
      />
    </Navigator>
  );
};