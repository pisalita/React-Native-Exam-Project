import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Menu from "../../screens/Menu";
import UpdateUser from "../../screens/UpdateUser";

import { MenuStackParamList } from "../../types/MenuStackParamList";

const Stack = createNativeStackNavigator<MenuStackParamList>();

const MenuStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MenuScreen"
        component={Menu}
        options={{ title: "Menu" }}
      />
      <Stack.Screen
        name="UpdateUserScreen"
        component={UpdateUser}
        options={{ title: "Update user" }}
      />
    </Stack.Navigator>
  );
};

export default MenuStackNavigator;
