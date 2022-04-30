import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../../screens/Login";
import CreateUser from "../../screens/CreateUser";
import { LoginStackParamList } from "../../types/LoginStackParamList";

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{ title: "Log in" }}
      />
      <Stack.Screen
        name="CreateUserScreen"
        component={CreateUser}
        options={{ title: "Create user" }}
      />
    </Stack.Navigator>
  );
};

export default LoginStackNavigator;
