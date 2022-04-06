import React from "react";
import { useAppSelector } from "../app/hooks";
import TabNavigator from "./TabNavigator";
import LoginStackNavigator from "./LoginStackNavigator";
import UpdateUser from "../screens/UpdateUser";

const Index = () => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return <LoginStackNavigator />;
  }

  if (!user.displayName || !user.photoUrl) {
    return <UpdateUser />;
  }

  return <TabNavigator />;
};

export default Index;
