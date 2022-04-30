import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { logout } from "../features/User";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import UpdateUser from "./UpdateUser";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuStackParamList } from "../types/MenuStackParamList";

type ScreenNavigationType = NativeStackNavigationProp<
  MenuStackParamList,
  "MenuScreen"
>;

const Menu = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ScreenNavigationType>();

  return (
    <View style={styles.container}>
      <View style={styles.profileOverviewContainer}>
        <View>
          <Image
            style={styles.profileOverviewAvatar}
            source={{ uri: user?.photoUrl }}
          />
        </View>
        <View style={styles.profileOverviewInfo}>
          <Text style={styles.profileOverviewInfoDisplayName}>
            {user?.displayName}
          </Text>
          <Text style={styles.profileOverviewInfoEmail}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.editProfileButton}>
        <CustomButton
          title="Edit profile"
          onPress={() => {
            navigation.navigate("UpdateUserScreen");
          }}
        />
      </View>
      <View style={styles.notifications}>
        <Text style={styles.notificationTitle}>NOTIFICATIONS</Text>
      </View>
      <CustomButton
        title="Logout"
        onPress={() => {
          dispatch(logout());
        }}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
  },
  profileOverviewContainer: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
  },
  editProfileButton: {
    flex: 1,
    alignSelf: "stretch",
  },
  notifications: {
    flex: 2,
    alignSelf: "stretch",
  },
  notificationTitle: {
    fontSize: 26,
    color: "#32305D",
    fontWeight: "bold",
  },
  profileOverviewAvatar: {
    borderRadius: 70,
    width: 70,
    height: 70,
  },
  profileOverviewInfo: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 30,
  },
  profileOverviewInfoDisplayName: {
    fontSize: 26,
    color: "#32305D",
    fontWeight: "bold",
  },
  profileOverviewInfoEmail: {
    color: "#333333",
  },
});
