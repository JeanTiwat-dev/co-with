import { StyleSheet, Text, View , Image} from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Loading = () => {
    return (
        <View style={{flex: 1, backgroundColor: "#476E9E", alignItems: "center", justifyContent: "center"}}>
            <Image
                style={{ width: 300, height: 300 , }}
                source={require("../assets/logohugg_mini.png")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loading;