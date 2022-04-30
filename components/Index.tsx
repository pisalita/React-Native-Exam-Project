import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import TabNavigator from "./navigation/TabNavigator";
import LoginStackNavigator from "./navigation/LoginStackNavigator";
import UpdateUser from "../screens/UpdateUser";
import * as SecureStore from "expo-secure-store";
import { rehydrateUser } from "../features/User";

const Index = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserDataFromSecureStorage = async () => {
      const userJson = await SecureStore.getItemAsync("user");
      let userFromSecureStorage = null;
      if (userJson) {
        userFromSecureStorage = JSON.parse(userJson);
      }
      if (userFromSecureStorage) {
        dispatch(rehydrateUser(userFromSecureStorage));
      }
    };

    getUserDataFromSecureStorage();
  }, []);

  if (!user) {
    return <LoginStackNavigator />;
  }

  if (!user.displayName || !user.photoUrl) {
    return <UpdateUser />;
  }

  return <TabNavigator />;
};

export default Index;
