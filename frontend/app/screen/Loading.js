import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Loading = () => {
    const router = useNavigation();

    async function Checklogin() {
        try {
            const datauser = await AsyncStorage.getItem("@user");
            if (!datauser) {
                router.replace("PreLogin");
            } else {
                router.replace("TabHome");
            }
        } catch (error) { }
    }

    useEffect(() => {
        setTimeout(() => {
            Checklogin();
        }, 1000);
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#476E9E",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Image
                style={{ width: 300, height: 300 }}
                source={require("../assets/logohugg_mini.png")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Loading;
