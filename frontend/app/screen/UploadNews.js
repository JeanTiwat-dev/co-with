import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UploadNews = () => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.header}>หัวข้อข่าว</Text>
                <TextInput style={styles.input}></TextInput>
                <Text style={styles.header}>เนื้อหา</Text>
                <TextInput style={styles.textarea} multiline></TextInput>
                <TouchableOpacity style={styles.upload}>
          <Ionicons
            name="cloud-upload-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>อัพโหลดรูปภาพ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submit}>
          <Ionicons
            name="send-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>อัพโหลดข่าว</Text>
        </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        paddingHorizontal: 40,
    },
    header : {
        fontSize : 20,
        fontWeight : 'bold',
        marginTop : 25
    },
    upload: {
        padding: 10,
        backgroundColor: "#rgb(119,203,229)",
        alignItems: "center",
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 10,
        width: 300,
        alignSelf : 'center',

      },
      submit: {
        padding: 10,
        backgroundColor: "#0CD59D",
        alignItems: "center",
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 30,
        width: 300,
        alignSelf : 'center'
      },
      input: {
        height: 40,
        borderWidth: 0.5,
        padding: 10,
        marginTop: 20,
        borderColor: "grey",
        borderRadius: 10,
      },
      textarea : {
        height: 100,
        padding : 10,
        borderWidth: 0.5,
        marginTop: 20,
        borderColor: "grey",
        borderRadius: 10,
      }
})

export default UploadNews;