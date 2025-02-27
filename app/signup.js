import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        if (!userName || !email || !password) {
            Alert.alert("Validation Error", "Please fill in all fields.");
            return;
        }
        const userDetails = { userName, email, password, token: "sample-token" };
        await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
        console.log("User logged in:", userDetails);
        router.push("/login");
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => <></>,
                    headerTitle: "",
                }}
            />
            <View style={{ padding: 2, flex:1 }} testID="signupContainer">
                <View
                    style={{
                        padding: 20,
                       marginLeft: "auto",
                       marginRight: "auto",
                       borderRadius: 50,
                       height: 260,
                       // ...SHADOWS.medium,
                        //shadowColor: COLORS.white,
                        flex:0.5,
           justifyContent: 'center',
           alignItems: 'center'
                    }}
                    testID="imageIcon"
                >
                    <Image
                        source={icons.menu}
                        style={{
                            width: 250,
                            height: 250,
                            marginBottom: 20,
                            marginTop: 20,
                           borderRadius:50
                        }}
                    />
                </View>
                <View style={{ marginTop: 30 }} testID="formData">
                    <View style={{ marginBottom: 10 }} testID="userName">
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                padding: 10,
                                borderRadius: 5,
                                 marginBottom: 15,
                                flexDirection: "horizontal",
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: "98%",
                            }}
                            value={userName}
                            onChangeText={setUserName}
                            placeholder="UserName"
                        />
                    </View>
                    <View style={{ marginBottom: 10 }} testID="email">
                        <TextInput
                            style={{
                                borderColor: "#ccc",
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                                marginBottom: 10,
                            }}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                        />
                    </View>
                    <View style={{ marginBottom: 20 }} testID="password">
                        <TextInput
                            style={{
                                borderColor: "#ccc",
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                            }}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.primary,
                            padding: 15,
                            borderRadius: 5,
                            alignItems: "center",
                            marginBottom: 10,
                        }}
                        onPress={handleRegister}
                        testID="handleRegister"
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 5,
                        }}
                        testID="textData"
                    >
                        <Text style={{ marginRight: 5 }}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.push("/login")}>
                            <Text style={{ color: "blue" }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SignUp;