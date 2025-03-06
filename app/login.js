import React, { useState } from "react";
import { View, SafeAreaView, Image, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";
import ScreenHeaderBtn from '../components/ScreenHeaderBtn';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Validation Error: Please fill in all fields.");
      return;
    }

    const userDetails = { email, password, token: "sample-token" };

    console.log('userDetails', userDetails);

    try {
      const detailsDatafromSignup = await AsyncStorage.getItem("userDetails");
      if (detailsDatafromSignup) {
        const parsedDetails = JSON.parse(detailsDatafromSignup);
        if (userDetails.email === parsedDetails.email && userDetails.password === parsedDetails.password) {
          router.push("/home");
        } else {
          alert("Error: Incorrect email or password.");
        }
      } else {
        alert("Error: No user details found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error accessing AsyncStorage", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
     <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
<></>
          ),
          headerTitle: "",
        }}
      />
      <View style={{ flex: 1, padding:2}}>
        <View
          style={{
           padding: 20,
           marginLeft: "auto",
           marginRight: "auto",
            borderRadius: 50,
            height: 260,
           // ...SHADOWS.medium,
           // shadowColor: COLORS.white,
          flex:0.5,
           justifyContent: 'center',
           alignItems: 'center'
          }}
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

        {/* Form Component */}
        <View style={{ marginTop: "10%", padding: 10 }}>
          <View style={{ marginBottom: 20 }}>
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
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
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
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
            }}
            onPress={handleLogin}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Options */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
            border:1,
            padding:5,
            borderRadius:5,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text style={{ marginRight: 5 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={{ color: "blue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;