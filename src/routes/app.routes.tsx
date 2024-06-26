import { Platform } from "react-native";
import { useTheme } from "native-base";

import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home";
import { Training } from "@screens/Training";
import { PhysicalAssessment } from "@screens/PhysicalAssessment";
import { Consultancy } from "@screens/Consultancy";
import { History } from "@screens/History";
import { Profile } from "@screens/Profile";
import { Exercise } from "@screens/Exercise";

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

type TAppRoutes = {
  home: undefined;
  training: undefined;
  physicalAssessment: undefined;
  consultancy: undefined;
  history: undefined;
  profile: undefined;
  exercise: {
    exerciseId: string;
  };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<TAppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<TAppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.blue[500],
      tabBarInactiveTintColor: colors.gray[200],
      tabBarStyle: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6],
      }
    }}>
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize}/>
          )
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize}/>
          )
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize}/>
          )
        }}
      />
      <Screen
        name="training"
        component={Training}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="physicalAssessment"
        component={PhysicalAssessment}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="consultancy"
        component={Consultancy}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
};