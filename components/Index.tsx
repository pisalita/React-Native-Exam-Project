import React from "react";
import { useAppSelector } from "../app/hooks";
import TabNavigator from "./TabNavigator";
import LoginStackNavigator from "./LoginStackNavigator";

const Index = () => {

  const user = useAppSelector((state) => state.user.user);
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  console.log(user);
  console.log(loading);
  console.log(error);

  return <>{user ? <TabNavigator /> : <LoginStackNavigator />}</>;
};

export default Index;
