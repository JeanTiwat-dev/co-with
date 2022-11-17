import { useNavigation } from "@react-navigation/native";
import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";

const PreLogin = () => {
    const router = useNavigation();
    return (
        <View style={{flex: 1, backgroundColor: "#476E9E"}}>
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={{color: "white", fontSize: 35, fontWeight: "bold", marginTop: 100, marginBottom: 100}}>Let's get started !!!</Text>
                <Image
                    style={{ width: 300, height: 300 }}
                    source={require("../assets/Group.png")}
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
                        onPress={() => router.replace('Login')}
                    >
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default PreLogin;