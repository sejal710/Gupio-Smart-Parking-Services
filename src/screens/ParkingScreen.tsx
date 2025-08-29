import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { confirmSpot, cancelSpot } from "../store/spotSlice";
import Animated, { BounceIn, Layout } from "react-native-reanimated";

type Slot = {
    id: string;
    status: "available" | "booked";
};

const sections = { US: 15, LS: 8, B3: 7 };

const generateSlots = (section: string, count: number): Slot[] =>
    Array.from({ length: count }, (_, i) => ({
        id: `${section}-P${i + 1}`,
        status: "available",
    }));

const initialSlots: Slot[] = [
    ...generateSlots("US", sections.US),
    ...generateSlots("LS", sections.LS),
    ...generateSlots("B3", sections.B3),
];

const ParkingScreen = () => {
    const dispatch = useDispatch();
    const { available, total } = useSelector((state: RootState) => state.spots);
    const [activeBooking, setActiveBooking] = useState<Slot | null>(null);
    const [slots, setSlots] = useState<Slot[]>(initialSlots);

    const handlePress = (slot: Slot) => {
        if (slot.status === "booked") {
            Alert.alert("Cancel Booking", `Cancel ${slot.id}?`, [
                {
                    text: "Yes",
                    onPress: () => {
                        setSlots(prev =>
                            prev.map(s => s.id === slot.id ? { ...s, status: "available" } : s)
                        );
                        dispatch(cancelSpot());
                        if (activeBooking?.id === slot.id) setActiveBooking(null);
                    },
                },
                { text: "No" },
            ]);

        } else {
            Alert.alert("Confirm Booking", `Book ${slot.id}?`, [
                {
                    text: "Yes",
                    onPress: () => {
                        setSlots(prev =>
                            prev.map(s => s.id === slot.id ? { ...s, status: "booked" } : s)
                        );
                        dispatch(confirmSpot());
                        setActiveBooking({ ...slot, status: "booked" });
                    },
                },
                { text: "No" },
            ]);
        }
    };
    // Inactivity reminder timer
    useEffect(() => {
        let timer: any;

        const startReminder = () => {
            if (!activeBooking) return;

            timer = setTimeout(() => {
                Alert.alert(
                    "Reminder",
                    "You haven’t parked your vehicle yet. Would you like to cancel this?",
                    [
                        {
                            text: "Cancel Booking",
                            onPress: () => {
                                setSlots(prev =>
                                    prev.map(s =>
                                        s.id === activeBooking.id ? { ...s, status: "available" } : s
                                    )
                                );
                                dispatch(cancelSpot());
                                setActiveBooking(null); // stop reminders
                            },
                        },
                        {
                            text: "No, I will be there",
                            onPress: () => {
                                // Restart reminder after 10s
                                startReminder();
                            },
                        },
                    ]
                );
            }, 10000); // 10 seconds for demo
        };

        startReminder();

        return () => clearTimeout(timer); // cleanup if component unmounts
    }, [activeBooking]);


    const renderSection = (prefix: string, index: number) => {
        const sectionSlots = slots.filter(s => s.id.startsWith(prefix));

        return (
            <Animated.View
                key={prefix}
                entering={BounceIn.delay(index * 150)}
                layout={Layout.springify()}
                className="bg-white rounded-2xl p-4 mb-5 shadow-md"
            >
                <Text className="text-lg font-semibold mb-3 text-gray-900">{prefix} Section</Text>
                <View className="flex-row flex-wrap justify-center gap-2">
                    {sectionSlots.map(slot => (
                        <Animated.View
                            key={slot.id}
                            entering={BounceIn.delay(100)}
                            layout={Layout.springify()}
                        >
                            <TouchableOpacity
                                className={`w-20 h-20 rounded-xl justify-center items-center shadow-md ${slot.status === "available" ? "bg-green-500" : "bg-red-400"
                                    }`}
                                onPress={() => handlePress(slot)}
                            >
                                <Text className="text-white font-bold text-sm">{slot.id}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>
            </Animated.View>
        );
    };

    return (
        <ScrollView className="flex-1 p-3 bg-slate-100">
            <Text className="text-2xl font-bold mb-2 text-gray-800">Parking Layout</Text>
            <Text className="text-base mb-4 text-gray-700">
                Available Spots: {available} / {total}
            </Text>

            {Object.keys(sections).map((prefix, index) => renderSection(prefix, index))}
        </ScrollView>
    );
};

export default ParkingScreen;
