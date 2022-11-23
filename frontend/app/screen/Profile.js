import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import path from "../../path";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

function Profile() {
  const { width, height } = useWindowDimensions();
  const [user, setUser] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const router = useNavigation();
  const [image, setImage] = useState(null);
  const [objectImage, setObjectImage] = useState(null);
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [tel, setTel] = useState();
  const [facebook, setFacebook] = useState();
  //   const [imageUser, setUserImage] = useState(imguser);
  //   const imguser = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

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
    }
  };
  async function Getuser() {
    const datauser = await AsyncStorage.getItem("@user");
    // console.log(JSON.parse(datauser)._id);
    if (datauser) {
      await axios
        .post(`${path}/getUserbyId`, { _id: JSON.parse(datauser)[0]._id })
        .then((res) => {
          console.log(res.data);
          setUser(res.data[0]);
          setFirstname(res.data[0].firstname);
          setLastname(res.data[0].lastname);
          setEmail(res.data[0].email);
          setTel(res.data[0].tel);
          setFacebook(res.data[0].facebook);
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }
  useEffect(() => {
    Getuser();
  }, []);

  async function Updateprofile() {
    await axios.post(`${path}/updateprofile`, {
      _id: user._id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      tel: tel,
      facebook: facebook
    })
      .then((response) => {
        if (response.data == true) {
          if (image != null) {
            const data = new FormData();
            const newImageUri = "file:///" + objectImage.uri.split("file:/").join("");
            data.append("imageProfile", {
              uri: newImageUri,
              type: "image",
              name: newImageUri.split("/").pop()
            })
            data.append("_id", user._id);
            axios.post(`${path}/updateImageProfile`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
              .then((response) => {
                if (response.data == true) {
                  Getuser();
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
          // console.log(1)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <ScrollView
      style={{
        backgroundColor: "#1E4E89",
      }}
      contentContainerStyle={{ justifyContent: "center", flex: 1 }}
    >
      <View
        style={{
          backgroundColor: "#1E4E89",
          // width: width,
          // height: height,
          paddingVertical: 30,
          // paddingHorizontal: 20,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!image && (
          <Image
            style={{ width: 170, height: 170, borderRadius: 999 }}
            source={{ uri: `${path}${user.img}` }}
          />
        )}
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 170, height: 170, borderRadius: 999 }}
          />
        )}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            width: "75%",
            //   height: 300,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 35,
            paddingVertical: 30,
          }}
        >
          {/* user info professor*/}
          {user.role == "professor" && (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                defaultValue={firstname}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setFirstname(value)}
              />
              <TextInput
                defaultValue={lastname}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setLastname(value)}
              />
              <TextInput
                defaultValue={email}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setEmail(value)}
              />
              <TextInput
                defaultValue={tel}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setTel(value)}
              />
              <TextInput
                defaultValue={facebook}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setFacebook(value)}
              />
            </View>
          )}
          {/* user info student*/}
          {user.role == "student" && (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                defaultValue={firstname}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setFirstname(value)}
              />
              <TextInput
                defaultValue={lastname}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setLastname(value)}
              />

              <TextInput
                defaultValue={email}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setEmail(value)}
              />

            </View>
          )}
          {/* user info admin and Pr*/}
          {(user.role == "admin" || user.role == "PR") && (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                defaultValue={firstname}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setFirstname(value)}
              />
              <TextInput
                defaultValue={lastname}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setLastname(value)}
              />
              <TextInput
                defaultValue={email}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setEmail(value)}
              />
              <TextInput
                defaultValue={tel}
                editable={editVisible}
                style={styles.inputprofile}
                onChangeText={(value) => setTel(value)}
              />
            </View>
          )}

          {/* img */}
          {editVisible && (
            <TouchableOpacity style={styles.upload} onPress={pickImage}>
              <Ionicons
                name="cloud-upload-outline"
                size={20}
                style={{ marginRight: 10 }}
              ></Ionicons>
              <Text>อัพโหลดรูปภาพ</Text>
            </TouchableOpacity>
          )}

          {/* button */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!editVisible && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* edit */}
                <TouchableOpacity
                  style={styles.edit}
                  onPress={() => {
                    setEditVisible(!editVisible);
                  }}
                >
                  <Feather name="edit-3" size={20} color="black" />
                </TouchableOpacity>
                {/* logout */}
                <TouchableOpacity
                  style={styles.logout}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <AntDesign name="logout" size={20} color="white" />
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 10,
                      color: "white",
                    }}
                  >
                    LOGOUT
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Confirm */}
            {editVisible && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* cancel */}
                <TouchableOpacity
                  style={[
                    styles.logout2,
                    {
                      borderWidth: 1,
                      borderColor: "#FF9F29",
                      backgroundColor: "#EDEDED",
                    },
                  ]}
                  onPress={() => {
                    setEditVisible(!editVisible);
                    setImage(null);
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>cancel</Text>
                </TouchableOpacity>
                {/* confirm */}
                <TouchableOpacity
                  style={[
                    styles.logout2,
                    { marginLeft: 20, backgroundColor: "#FF9F29" },
                  ]}
                  onPress={() => {
                    setEditVisible(!editVisible);
                    Updateprofile();
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

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
                <AntDesign name="warning" size={60} color="tomato" />
                <Text style={{ fontSize: 18, marginTop: 25 }}>
                  Press the "Logout" to log out!
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
                      Back
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
                      await AsyncStorage.removeItem("@user");
                      router.replace("Login");
                    }}
                  >
                    <Text style={styles.textStyle}>Logout</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  inputprofile: {
    backgroundColor: "#EAEAEA",
    width: "75%",
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    padding: 20,
  },
  upload: {
    padding: 10,
    backgroundColor: "#rgb(119,203,229)",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    width: "75%",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  logout: {
    backgroundColor: "tomato",
    width: 120,
    height: 50,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 10,
    flexDirection: "row",
  },
  logout2: {
    width: 100,
    height: 50,
    // marginLeft: 20,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 10,
    flexDirection: "row",
  },
  edit: {
    backgroundColor: "#AEBDCA",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 10,
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
    // fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default Profile;
