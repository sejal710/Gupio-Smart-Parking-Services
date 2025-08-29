import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen() {
    return (
        <View className="flex-1 justify-center items-center bg-white p-6">
            <Text className="text-2xl font-bold mb-6 text-center">
                Gupio Smart Parking Services
            </Text>
            <TextInput className="border p-3 mb-4 rounded w-full" placeholder="Employee ID" />
            <TextInput
                className="border p-3 mb-4 rounded w-full"
                placeholder="Password"
                secureTextEntry
            />
            <TouchableOpacity className="bg-blue-500 p-3 rounded w-full items-center">
                <Text className="text-white font-bold">Send OTP</Text>
            </TouchableOpacity>
        </View>
    );
}
