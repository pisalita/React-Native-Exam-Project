import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import ChatStackNavigator from "./ChatStackNavigator";
import * as SecureStore from "expo-secure-store";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const setUserDataIntoSecureStorage = async () => {
      await SecureStore.setItemAsync("user", JSON.stringify(user));
    };
    setUserDataIntoSecureStorage();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={ChatStackNavigator} />
      <Tab.Screen name="Posts" component={ChatStackNavigator} />
      <Tab.Screen name="Chat" component={ChatStackNavigator} />
      <Tab.Screen name="Test" component={ChatStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
