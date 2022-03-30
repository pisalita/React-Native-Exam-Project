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

  // if(user){
  // fetch user data so they wont get prompted for displayName and photoUrl if they have already done it once.
  // }

  // Make this part update user and save displayName + photoUrl in reducer, so we can add it to the message functionality
  // this component/functionality can also be used under menu -> update profile. Use it here to force an update on login
  // since firebase doesent return any of this on create user or login.

  // if (!user.displayName || !user.photoUrl) {
  //   return <UpdateUser />;
  // }

  return <TabNavigator />;
};

export default Index;
