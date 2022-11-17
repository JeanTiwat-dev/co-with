import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import path from "../../path";

function Contact() {
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [contact, setContact] = useState([]);
  const [allContact, setAllContact] = useState([]);
  const [search, setSearch] = useState([]);
  const [backup, setBackup] = useState([]);
  const getContacts = async () => {
    await axios
      .get(`${path}/getContacts`)
      .then((res) => {
        setAllContact(res.data);
        setBackup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getContacts();
  }, []);

  function CardContact(props) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: props.color,
          width: "45%",
          height: 200,
          marginHorizontal: "2.5%",
          paddingHorizontal: 20,
          borderRadius: 15,
          marginVertical: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: -2,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5,
        }}
        onPress={() => {
          setContact(props.value);
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ paddingVertical: 20, alignItems: "center" }}>
          <Image
            style={{
              width: 100,
              height: 100,
              marginBottom: 15,
              borderRadius: 999,
            }}
            source={props.image}
          />
          <Text style={{ fontWeight: "bold" }}>{props.txt}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView style={{ width: width, paddingHorizontal: 25 }}>
      <View style={{ paddingVertical: 30 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>Contact</Text>
        {/* search */}
        <TextInput
          style={{
            height: 40,
            borderWidth: 0.5,
            padding: 10,
            marginTop: 20,
            borderColor: "white",
            borderRadius: 10,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: -2,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 5,
          }}
          placeholder={"Search"}
          returnKeyType="search"
          onChangeText={(txtname)=>{
            const fillter = backup.filter((data)=> data.name.indexOf(txtname) + 1)
            setAllContact(fillter);
          }}
        ></TextInput>
      </View>
      {/* cardcontact */}
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          flexWrap: "wrap",
          width: "100%",
          // marginTop: 10,
        }}
      >
        {/* card */}
        {allContact &&
          allContact.map((item, index) => {
            console.log(`${path}${item.img}`);
            return (
              <CardContact
                key={index}
                color="#607EAA"
                image={{ uri: `${path}${item.img}` }}
                txt={item.name}
                value={item}
              />
            );
          })}
        {/* <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname' />
        <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname' />
        <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname' />
        <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname' />
        <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname' />
        <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname' /> */}
      </View>
      {/* modal */}
      <View style={styles.centeredView}>
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
              <Image
                style={{ width: 150, height: 150, marginBottom: 25 , borderRadius: 999 }}
                source={{uri: `${path}${contact.img}`}}
              />
              <Text style={{ fontSize: 25, marginBottom: 10 }}>
                {contact.name}
              </Text>
              <Text style={{ fontSize: 14 }}>
                ช่องทางการติดต่อของอาจารย์ช่องทางการติดต่อของอาจารย์ช่องทางการติดต่อของอาจารย์ช่องทางการติดต่อของอาจารย์
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
                    // { marginLeft: 5, marginRight: 5 },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Back</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
    padding: 35,
    width: "70%",
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
    backgroundColor: "#FFB13C",
    width: 120,
    height: 50,
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
    marginTop: 25,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Contact;
