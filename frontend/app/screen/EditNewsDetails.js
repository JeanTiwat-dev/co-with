import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EditNews from "./EditNews";
import { useState } from "react";

const EditNewsDetails = () => {
  const [data, setData] = useState({
    id: 1,
    title: "news1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla eros volutpat nisl semper, vitae tempor diam vulputate. Pellentesque a lobortis libero. Vivamus mauris arcu, ultrices sed condimentum et, iaculis sit amet enim. Fusce porta lacinia libero, eu dignissim neque pulvinar id. Ut et dignissim mauris. Proin fermentum et sem eget tristique. Donec imperdiet nulla iaculis enim finibus malesuada. Duis vel risus nisl. Nulla tristique mi in orci auctor, nec dignissim ligula euismod. In varius eu nulla vel commodo. Maecenas sodales mi sit amet tortor euismod, vel porta nulla dapibus. Nunc semper sollicitudin mi id porta.",
    uri: "https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/ogimage.png",
  })
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState('');
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.topic}>แก้ไขข่าว</Text>
        <Text style={styles.header}>หัวข้อข่าว</Text>
        <TextInput style={styles.input} value={topic} onChangeText={setTopic}></TextInput>
        <Text style={styles.header}>เนื้อหา</Text>
        <TextInput style={styles.textarea} value={content} onChangeText={setContent} multiline={true}
          numberOfLines={4}></TextInput>
          {imageUri !== '' && <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.imageHeader}>รูปของคุณ</Text>
            <Image source={{ uri: imageUri }} resizeMode='cover' style={styles.uploadImage}/>
          </View>
        </View>}
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
            name="hammer-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>แก้ไขข่าว</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 40,
  },
  topic: {
    fontSize: 35,
    marginTop: 30,
  },
  imageHeader : {
    fontSize: 20,
    fontWeight: 'bold',
     textAlign: 'center',
     marginBottom : 5
    },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25
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
    alignSelf: 'center',

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
    alignSelf: 'center'
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    padding: 10,
    marginTop: 20,
    borderColor: "grey",
    borderRadius: 10,
  },
  uploadImage : {
    width : '100%',
    height : 200
  },
  textarea: {
    height: 100,
    padding: 10,
    borderWidth: 0.5,
    marginTop: 20,
    borderColor: "grey",
    borderRadius: 10,
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    height : 200,
    overflow : 'hidden',
    marginTop : 25
  },
  cardContent: {

  }
})

export default EditNewsDetails;