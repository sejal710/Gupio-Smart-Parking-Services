

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/DashboardScreen";
import Parking from "../screens/ParkingScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export type BottomTabParamList = {
    Dashboard: undefined;
    Parking: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const AppTabs = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName="Dashboard"
                screenOptions={{ headerShown: false }}
            >
                <Tab.Screen name="Dashboard" component={Dashboard} />
                <Tab.Screen name="Parking" component={Parking} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default AppTabs;
