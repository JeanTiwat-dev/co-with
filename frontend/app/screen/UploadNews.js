import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import {useState} from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import path from "../../path";
import * as ImagePicker from 'expo-image-picker';
import { TabRouter } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const UploadNews = () => {
  const router = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newsImage, setNewsImage] = useState(null);
  const [fileNameNews, setFileNameNews] = useState('');
  const [fileNewsImage, setFileNewsImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      let formData = new FormData();
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
      setFileNameNews(filename);
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      setNewsImage(result.uri);
      formData.append('file', { uri: localUri, name: filename, type });
      setFileNewsImage(formData)
      console.log(filename)
    } else {
      setNewsImage('');
    }
  };
  const submitHandler = async () => {
    await axios.post(`${path}/addNews`, {
      "title" : title,
      "release" : new Date().toISOString().split('T')[0],
      "content" : content,
      "image" : "/image/news/"+fileNameNews
    }).then(res => {
    }).catch(err => {
      console.log(err.response);
    });
    await axios.post(`${path}/uploadImageNews`, fileNewsImage, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => {
    }).catch(err => {
      console.log(err.response);
    });
    router.navigate('SubmitNews', {news : {
      "title" : title,
      "release" : new Date().toISOString().split('T')[0],
      "content" : content,
      "image" : "/image/news/"+fileNameNews
    }});
  }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.header}>หัวข้อข่าว</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle}></TextInput>
                <Text style={styles.header}>เนื้อหา</Text>
                <TextInput style={styles.textarea} multiline value={content} onChangeText={setContent}></TextInput>
                {newsImage && <View style={styles.card}>
          <View>
            <Text style={styles.imageHeader}>รูปของคุณ</Text>
            <Image source={{ uri: newsImage }} resizeMode='cover' style={styles.uploadImage} />
          </View>
        </View>}
                <TouchableOpacity style={styles.upload} onPress={pickImage}>
          <Ionicons
            name="cloud-upload-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>อัพโหลดรูปภาพ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submit} onPress={submitHandler}>
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
      height: 200,
      overflow: 'hidden',
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
        alignSelf : 'center',

      },
      uploadImage: {
        width: '100%',
        height: 200
      },
      imageHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5
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