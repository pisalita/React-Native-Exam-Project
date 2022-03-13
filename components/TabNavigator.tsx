import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useAppSelector } from "../app/hooks";
import CreateUser from "../screens/CreateUser";
import ChatStackNavigator from "./ChatStackNavigator";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const user = useAppSelector((state) => state.user.user);
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  console.log(user);
  console.log(loading);
  console.log(error);

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
        <CreateUser />
      )}
    </>
  );
};

export default TabNavigator;
