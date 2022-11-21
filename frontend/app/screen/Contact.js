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
import { useToast } from "react-native-toast-notifications";
import Toast from "react-native-toast-notifications";
import * as Clipboard from 'expo-clipboard';
import axios from "axios";
import path from "../../path";


function Contact() {
  const toastRef = useRef();
  const toast = useToast();
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [contact, setContact] = useState([]);
  const [allContact, setAllContact] = useState([]);
  const [search, setSearch] = useState([]);
  const [backup, setBackup] = useState([]);
  const getContacts = async () => {
    await axios
      .get(`${path}/getUser`)
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
  const functionCombined = () => {
    Clipboard.setStringAsync(`${contact.firstname + " " + contact.lastname}`);
    toast.show("Copied to clipboard", {
      type: "success",
      placement: "bottom",
      duration: 2000,
      // offsetTop: 300,
    });
  }

  
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
          onChangeText={(txtname) => {
            const fillter = backup.filter((data) => {
              if (data.firstname.indexOf(txtname) + 1 > 0 || data.lastname.indexOf(txtname) + 1 > 0) {
                return data;
              }
            })
            setAllContact(fillter);
          }}
        />
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
            // console.log(`${path}${item.img}`);
            if(item.role == "professor"){
              return (
                <CardContact
                  key={index}
                  color="#607EAA"
                  image={{ uri: `${path}${item.img}` }}
                  txt={item.firstname + "\n" + item.lastname}
                  value={item}
                />
              );
            }
          })}
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
                style={{ width: 150, height: 150, borderRadius: 999 }}
                source={{ uri: `${path}${contact.img}` }}
              />
              <Text style={{ fontSize: 25, marginBottom: 10 }}>
                {contact.name}
              </Text>
              <TouchableOpacity style={styles.input}
              onPress={() => functionCombined()}>
                <Text>
                  {contact.firstname + " " + contact.lastname}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.input}
              onPress={() => Clipboard.setStringAsync(`${contact.email}`)}>
              <Text>
                {contact.email}
              </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.input}
              onPress={() => Clipboard.setStringAsync(`${contact.tel}`)}>
              <Text
              >
                {contact.tel}
              </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.input} 
              onPress={() => Clipboard.setStringAsync(`${contact.facebook}`)}>
              <Text>
                {contact.facebook}
              </Text>
              </TouchableOpacity>
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
          <Toast ref={toastRef}/>
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
    width: "90%",
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
  input: {
    fontSize: 16,
    width: "100%",
    borderRadius: 10,
    marginTop: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
  },
});

export default Contact;
