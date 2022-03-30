import React from "react";
import { useAppSelector } from "../app/hooks";
import TabNavigator from "./TabNavigator";
import LoginStackNavigator from "./LoginStackNavigator";

const Index = () => {
  const user = useAppSelector((state) => state.user.user);

  return <>{user ? <TabNavigator /> : <LoginStackNavigator />}</>;
};

export default Index;
