import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useAppSelector } from "../app/hooks";
import Login from "../screens/Login";
import ChatStackNavigator from "./ChatStackNavigator";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const user = useAppSelector((state) => state.user.user);
  const loading = useAppSelector((state) => state.user.loading);
  console.log(user);
  console.log(loading);

  return (
    <>
      {user ? (
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
      ) : (
        <Login />
      )}
    </>
  );
};

export default TabNavigator;
