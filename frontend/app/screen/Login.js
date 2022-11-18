import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    ScrollView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import path from "../../path";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { height, width } = useWindowDimensions();
    const router = useNavigation();
    const handleLogin = async() => {
        // console.log(email, password);
        await axios.post(`${path}/login`, {
            email: email,
            password: password
        }).then((res) => {
            if (res.data.length != 0) {
                AsyncStorage.setItem("@user", JSON.stringify(res.data));
                router.replace("TabHome");
                alert("Login Success 🎉");
            } else {
                alert("Login Failed 😢");
            }
        }).catch((err) => {
            console.log(err);
        });
    };
    return (
        <View style={{flex: 1, backgroundColor: "#476E9E"}}>
            <View style={{flex: 1, backgroundColor: "#476E9E", alignItems: "center", justifyContent: "center"}}>
            <Image
                    style={{ width: 300, height: 300 , }}
                    source={require("../assets/logohugg_mini.png")}
                />
            </View>
            <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View
                style = {{
                    paddingVertical : 40,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    width: width,
                    backgroundColor: "white",
                }}
            >
                <View style={{paddingHorizontal: 50}}>
                    <Text
                        style={{ fontSize: 26, fontWeight: "bold", marginLeft: 10 }}
                    >
                        Email
                    </Text>
                    <TextInput style={styles.input}
                        placeholder="covidman@it.kmitl.ac.th"
                        onChangeText={text => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>
                <View style={{ marginTop: 20, paddingHorizontal: 50}}>
                    <Text
                        style={{ fontSize: 26, fontWeight: "bold", marginLeft: 10 }}
                    >
                        Password
                    </Text>
                    <TextInput style={styles.input}
                        placeholder="Password"
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{ marginTop: 30, alignItems: "center" }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "orange",
                            width: 150,
                            height: 60,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                        }}
                        onPress={() => handleLogin()}
                    >
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        width: "100%",
        borderRadius: 10,
        marginTop: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: "white",
    },
});



export default Login;