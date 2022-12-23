import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import CheckBox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import DatePicker from "react-native-neat-date-picker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import path from "../../path";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Form() {
  const router = useNavigation();
  const [user, setUser] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState(
    "https://static.files.bbci.co.uk/ws/simorgh-assets/public/news/images/metadata/poster-1024x576.png"
  );
  const [reason, setReason] = useState([
    { id: 1, txt: "ติดโควิด", isChecked: false },
    { id: 2, txt: "ฉีดวัคซีน", isChecked: false },
    { id: 3, txt: "กักตัวหรือเป็นผู้ที่มีความเสี่ยงสูง", isChecked: false },
  ]);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [imageStudentId, setImageStudentId] = useState(null);
  const [imageCovid, setImageCovid] = useState(null);
  const [date, setDate] = useState("");
  const [quarantine, setQuarantine] = useState("");
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);
  const [fileNameImageCard, setFileNameImageCard] = useState("");
  const [fileNameVerified, setFileNameVerified] = useState("");
  const [fileStudentId, setFileStudentId] = useState(null);
  const [fileVerified, setFileVerified] = useState(null);

  async function Getuser() {
    const datauser = await AsyncStorage.getItem("@user");
    // console.log(JSON.parse(datauser)._id);
    if (datauser) {
      await axios
        .post(`${path}/users/getUserId`, { _id: JSON.parse(datauser)._id })
        .then((res) => {
          // console.log(res.data[0].img);
          setUser(res.data);
          // if (res.data[0].img != null) {
          //   setImage(res.data[0].img);
          // }
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }
  useEffect(() => {
    Getuser();
  }, []);

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
      let filename = localUri.split("/").pop();
      setFileNameImageCard(filename);
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      setImageStudentId(result.uri);
      formData.append("file", { uri: localUri, name: filename, type });
      setFileStudentId(formData);
    } else {
      setImageStudentId("");
    }
  };

  const pickImageCovid = async () => {
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
      let filename = localUri.split("/").pop();
      setFileNameVerified(filename);
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      setImageCovid(result.uri);
      formData.append("file", { uri: localUri, name: filename, type });
      setFileVerified(formData);
    } else {
      setImageCovid("");
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (output) => {
    setDate(output.dateString);
    setShowDatePicker(false);
    console.log(output.date);
    console.log(output.dateString);
  };

  const SubmitFormHandler = async () => {
    let formData = new FormData();
    let fullname = studentName.split(" ");
    let firstname = fullname[0];
    let surname = fullname[1];
    let realreason = "";
    if (check1 === true) {
      realreason += reason[0].txt + " ";
    }
    if (check2 === true) {
      realreason += reason[1].txt + " ";
    }
    if (check3 === true) {
      realreason += reason[2].txt + " ";
    }
    await axios
      .post(`${path}/infected`, {
        studentId: studentId,
        firstname: firstname,
        lastname: surname,
        imgStudentCard: "/img_infected/" + fileNameImageCard,
        imgForVertified: "/img_infected/" + fileNameVerified,
        reasonForAbsent: realreason,
        reasonForQuarantine: quarantine,
        dataInfected: date,
      })
      .then((res) => {
        if(res.data != "Error"){
          axios
          .post(`${path}/infected/uploadImageInfected`, fileStudentId, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            if(res.data == true){
              axios
              .post(`${path}/infected/uploadImageInfected`, fileVerified, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((res) => {
                if(res.data == true){
                  router.navigate("SubmitForm");
                }
              })
              .catch((err) => {
                console.log(err);
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <ScrollView style={styles.container}>
        <Text style={styles.topic}>
          ฟอร์มสำหรับนักศึกษาที่ติดเชื้อ Covid-19
        </Text>
        <Text style={styles.header}>รหัสนักศึกษา</Text>
        <TextInput
          style={styles.input}
          value={studentId}
          onChangeText={setStudentId}
        ></TextInput>
        <Text style={styles.header}>ชื่อจริง-นามสกุล</Text>
        <TextInput
          style={styles.input}
          value={studentName}
          onChangeText={setStudentName}
        ></TextInput>
        <Text style={styles.header}>
          หลักฐานยืนยันตัวตน เช่น บัตรประจำตัวนักศึกษา บัตรประชาชน
        </Text>
        {imageStudentId && (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.imageHeader}>รูปของคุณ</Text>
              <Image
                source={{ uri: imageStudentId }}
                resizeMode="cover"
                style={styles.uploadImage}
              />
            </View>
          </View>
        )}
        <TouchableOpacity
          style={styles.upload}
          onPress={() => {
            pickImage();
          }}
        >
          <Ionicons
            name="cloud-upload-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>อัพโหลดรูปภาพ</Text>
        </TouchableOpacity>
        <Text style={styles.header}>ลาเนื่องจาก</Text>
        <View style={styles.wrapper}>
          <CheckBox
            style={styles.checkbox}
            value={check1}
            onValueChange={() => setCheck1(!check1)}
          />
          <Text style={styles.textCheckBox}>ติดโควิด</Text>
        </View>
        <View style={styles.wrapper}>
          <CheckBox
            style={styles.checkbox}
            value={check2}
            onValueChange={() => setCheck2(!check2)}
          />
          <Text style={styles.textCheckBox}>ฉีดวัคซีน</Text>
        </View>
        <View style={styles.wrapper}>
          <CheckBox
            style={styles.checkbox}
            value={check3}
            onValueChange={() => setCheck3(!check3)}
          />
          <Text style={styles.textCheckBox}>
            กักตัว หรือเป็นผู้ที่มีความเสี่ยงสูง
          </Text>
        </View>
        <Text style={styles.header}>กักตัวเนื่องจาก (ทำเฉพาะกรณีกักตัว)</Text>
        <TextInput
          style={styles.input}
          value={quarantine}
          onChangeText={setQuarantine}
        ></TextInput>
        <Text style={styles.header}>
          ภาพหลักฐานแสดงการติดโควิดหรือการกักตัว
        </Text>
        {imageCovid && (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.imageHeader}>รูปของคุณ</Text>
              <Image
                source={{ uri: imageCovid }}
                resizeMode="cover"
                style={styles.uploadImage}
              />
            </View>
          </View>
        )}
        <TouchableOpacity
          style={styles.upload}
          onPress={() => {
            pickImageCovid();
          }}
        >
          <Ionicons
            name="cloud-upload-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>อัพโหลดรูปภาพ</Text>
        </TouchableOpacity>
        <Text style={styles.header}>
          เริ่มติดโควิดหรือทราบว่าติดโควิดหรือต้องกักตัวตั้งแต่วันที่
        </Text>
        <TouchableOpacity onPress={openDatePicker} style={styles.datepicker}>
          <Ionicons
            name="calendar-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>เลือกวันที่</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submit} onPress={SubmitFormHandler}>
          <Ionicons
            name="send-outline"
            size={20}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text>ส่งข้อมูล</Text>
        </TouchableOpacity>
      </ScrollView>
      <DatePicker
        isVisible={showDatePicker}
        mode={"single"}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 40,
    // paddingVertical: 30,
    // marginVertical: 30,
  },
  submit: {
    padding: 10,
    backgroundColor: "#0CD59D",
    alignItems: "center",
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 30,
  },
  header: {
    fontSize: 16,
    marginTop: 20,
  },
  topic: {
    fontSize: 22,
    marginTop: 30,
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    padding: 10,
    marginTop: 20,
    borderColor: "grey",
    borderRadius: 10,
  },
  upload: {
    padding: 10,
    backgroundColor: "#rgb(119,203,229)",
    alignItems: "center",
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },
  datepicker: {
    padding: 10,
    backgroundColor: "#E6736A",
    alignItems: "center",
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    paddingVertical: 15,
  },
  text: {
    fontSize: 15,
  },
  uploadImage: {
    width: "100%",
    height: 200,
  },
  checkbox: {
    marginRight: 10,
  },
  textCheckBox: {
    fontSize: 15,
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
    height: 200,
    overflow: "hidden",
    marginTop: 25,
  },
  cardContent: {},
  imageHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
});

export default Form;
