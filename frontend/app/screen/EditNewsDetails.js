import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
  Pressable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EditNews from "./EditNews";
import { useState } from "react";
import path from "../../path";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import {useNavigation} from "@react-navigation/native";
import { Feather, AntDesign } from "@expo/vector-icons";

const EditNewsDetails = ({ route }) => {
  console.log(route);
  const router = useNavigation();
  const [data, setData] = useState(route.params.data);
  const [topic, setTopic] = useState(route.params.data.title);
  const [content, setContent] = useState(route.params.data.content);
  // const [imageUri, setImageUri] = useState(route.params.data.image);
  const [image, setImage] = useState(null);
  const [title, setTitie] = useState();
  const [contentNew, setContentNew] = useState();
  const [objectImage, setObjectImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const deleteHandler = async () => {
    await axios.post(`${path}/deleteNews`, {
      _id : data._id
    }).then(res => {
      if(res.data == true){
        router.goBack();
      }
      console.log('delete')
    }).catch(err => {
      console.log(err.response);
    });
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
      setObjectImage(result)
      console.log(image);
    }
  };

  async function Editnews() {
    // if (user.role == "admin") {
    //   console.log(firstname, lastname, email, tel);
    // }
    await axios.post(`${path}/editnews`, {
      _id : data._id,
      title : topic,
      content : content,
      release : new Date(),
      image : data.image
    })
    .then((response) =>{
      if(response.data == true){
        if(image != null){
          const data1 = new FormData();
          const newImageUri = "file:///" + objectImage.uri.split("file:/").join("");
          data1.append("imageNews", {
            uri : newImageUri,
            type : "image",
            name : newImageUri.split("/").pop()
          })
          console.log(data)
          data1.append("_id", data._id);
          axios.post(`${path}/EditImageNews`, data1, {headers : {'Content-Type' : 'multipart/form-data'}})
          .then((response) =>{
            if(response.data == true){
              router.goBack();
            }
          })
          .catch((err) =>{
            console.log(err)
          })
        }
        else{
          router.goBack();
        }
      }
    })
    .catch((err) =>{
      console.log(err)
    })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.topic}>Edit News Details</Text>
        <Text style={styles.header}>หัวข้อข่าว</Text>
        <TextInput
          style={styles.input}
          value={topic}
          onChangeText={(value) => setTopic(value)}
        />
        <Text style={styles.header}>เนื้อหา</Text>
        <TextInput
          style={styles.textarea}
          value={content}
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => setContent(value)}
        />
        {/* image new */}
        {image && (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.imageHeader}>รูปของคุณ</Text>
              <Image
                source={{ uri: image }}
                resizeMode="cover"
                style={styles.uploadImage}
              />
            </View>
          </View>
        )}
        {/* old image */}
        {!image && (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.imageHeader}>รูปของคุณ</Text>
              <Image
                source={{ uri: `${path}${route.params.data.image}` }}
                resizeMode="cover"
                style={styles.uploadImage}
              />
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.upload} onPress={pickImage}>
          <Ionicons
            name="cloud-upload-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>อัพโหลดรูปภาพ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.delete} onPress={() => {setModalVisible(!modalVisible);}}>
          <Ionicons
            name="trash-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>ลบข่าว</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submit} onPress={()=>{
          Editnews();
        }}>
          <Ionicons
            name="hammer-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>แก้ไขข่าว</Text>
        </TouchableOpacity>
        {/* modal */}
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <AntDesign name="delete" size={60} color="tomato" />
                <Text style={{ fontSize: 18, marginTop: 25 }}>
                  คุณยืนยันที่จะลบข่าวนี้ใช่หรือไม่ ?
                </Text>
                {/* button */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  {/* back */}
                  <Pressable
                    style={[
                      styles.button,
                      // styles.buttonClose,
                      {
                        backgroundColor: "#EDEDED",
                        marginRight: 15,
                        borderWidth: 1,
                        borderColor: "tomato",
                      },
                    ]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={[styles.textStyle, { color: "tomato" }]}>
                      กลับ
                    </Text>
                  </Pressable>
                  {/* logout */}
                  <Pressable
                    style={[
                      styles.button,
                      // styles.buttonClose,
                      { backgroundColor: "tomato" },
                    ]}
                    onPress={async () => {
                      setModalVisible(false);
                      deleteHandler();
                    }}
                  >
                    <Text style={styles.textStyle}>ลบ</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 40,
  },
  topic: {
    fontSize: 28,
    marginTop: 30,
    fontWeight: "bold",
  },
  imageHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
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
    alignSelf: "center",
  },
  delete: {
    padding: 10,
    backgroundColor: "#EC5656",
    alignItems: "center",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    width: 300,
    alignSelf: "center",
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
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    padding: 10,
    marginTop: 20,
    borderColor: "grey",
    borderRadius: 10,
  },
  uploadImage: {
    width: "100%",
    height: 200,
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
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    // height: 200,
    overflow: "hidden",
    marginTop: 25,
  },
  cardContent: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 10,
    width: "75%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: -2,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 5,
    marginTop: 25,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});

export default EditNewsDetails;
