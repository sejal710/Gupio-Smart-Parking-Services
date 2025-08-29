import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
// import DashboardScreen from "../screens/DashboardScreen";

export type RootStackParamList = {
    Login: undefined;
};

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                {/* <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
// npm install @react-navigation/native @react-navigation/native-stack