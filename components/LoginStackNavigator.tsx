import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/Login";
import CreateUser from "../screens/CreateUser";
import { LoginStackParamList } from "../types/LoginStackParamList";

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateUserScreen" component={CreateUser} />
      <Stack.Screen name="LoginScreen" component={Login} />
    </Stack.Navigator>
  );
};

export default LoginStackNavigator;
