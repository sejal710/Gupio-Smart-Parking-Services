import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/DashboardScreen";
import Parking from "../screens/ParkingScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Home, Car } from "lucide-react-native";

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
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        if (route.name === "Dashboard") {
                            return <Home color={color} size={size} />;
                        } else if (route.name === "Parking") {
                            return <Car color={color} size={size} />;
                        }
                    },
                    tabBarActiveTintColor: "#007AFF", // Blue when active
                    tabBarInactiveTintColor: "gray",   // Gray when inactive
                })}
            >
                <Tab.Screen name="Dashboard" component={Dashboard} />
                <Tab.Screen name="Parking" component={Parking} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default AppTabs;
