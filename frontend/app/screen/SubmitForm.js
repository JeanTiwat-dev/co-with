import {View,StyleSheet,Text, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
function SubmitForm (){
    const router = useNavigation();
    return (
        <View style={styles.container}>
            <Ionicons name="checkbox-outline" size={70} color="green"></Ionicons>
            <Text style={styles.header}>กรอกฟอร์มสำเร็จ</Text>
            <Text style={styles.text}>ขอบคุณที่ให้ความร่วมมือในการกรอกข้อมูล</Text>
            <TouchableOpacity style={styles.backtohome} onPress={() => {router.navigate('Home')}}>
          <Ionicons
            name="chevron-back-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>กลับไปหน้าหลัก</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 10,
        flex: 1,
        width: '100%',
        justifyContent : 'center',
        alignItems : 'center',
    },
    header : {
        fontSize : 24,
        marginTop: 20
    },
    backtohome : {
    padding: 10,
    paddingHorizontal : 40,
    backgroundColor: "#0CD59D",
    alignItems: "center",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    },
    text : {
        color : 'grey',
        marginTop : 10
    }
})

export default SubmitForm;