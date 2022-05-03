import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import ChatStackNavigator from "./ChatStackNavigator";
import * as SecureStore from "expo-secure-store";
import MenuStackNavigator from "./MenuStackNavigator";
import { Image } from "react-native";

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
      <Tab.Screen name="Discover" component={ChatStackNavigator} />
      <Tab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../chatIcon.png")}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? "#5050A5" : "#707070",
              }}
            />
          ),
        }}
      />
      <Tab.Screen name="Menu" component={MenuStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
