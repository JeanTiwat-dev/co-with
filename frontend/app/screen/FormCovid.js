import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView, Platform } from "react-native";
import CheckBox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import DatePicker from 'react-native-neat-date-picker';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { launchImageLibrary } from 'react-native-image-picker';



function Form() {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [reason, setReason] = useState([{ id: 1, txt: 'ติดโควิด', isChecked: false },
    { id: 2, txt: 'ฉีดวัคซีน', isChecked: false },
    { id: 3, txt: 'กักตัวหรือเป็นผู้ที่มีความเสี่ยงสูง', isChecked: false }]);
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const openDatePicker = () => {
        setShowDatePicker(true);
    };
    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response) {
                setPhoto(response);
            }
        });
    };

    const onCancel = () => {
        setShowDatePicker(false);
    };

    const onConfirm = output => {
        setShowDatePicker(false);
        console.log(output.date);
        console.log(output.dateString);
    };



    return (
        <View>
            <ScrollView style={styles.container}>
                <Text style={styles.topic}>ฟอร์มสำหรับนักศึกษาที่ติดเชื้อ Covid-19</Text>
                <Text style={styles.header}>รหัสนักศึกษา</Text>
                <TextInput style={styles.input}></TextInput>
                <Text style={styles.header}>ชื่อจริง-นามสกุล</Text>
                <TextInput style={styles.input}></TextInput>
                <Text style={styles.header}>หลักฐานยืนยันตัวตน เช่น บัตรประจำตัวนักศึกษา บัตรประชาชน</Text>
                <TouchableOpacity style={styles.upload} onPress={handleChoosePhoto}>
                    <Ionicons name="cloud-upload-outline" size={20} style={{ marginRight: 10 }}></Ionicons>
                    <Text>อัพโหลดรูปภาพ</Text>
                </TouchableOpacity>
                <Text style={styles.header}>ลาเนื่องจาก</Text>
                <View style={styles.wrapper}>
                    <CheckBox style={styles.checkbox} value={check1} onValueChange={() => setCheck1(!check1)} />
                    <Text style={styles.textCheckBox}>ติดโควิด</Text>
                </View>
                <View style={styles.wrapper}>
                    <CheckBox style={styles.checkbox} value={check2} onValueChange={() => setCheck2(!check2)} />
                    <Text style={styles.textCheckBox}>ฉีดวัคซีน</Text>
                </View>
                <View style={styles.wrapper}>
                    <CheckBox style={styles.checkbox} value={check3} onValueChange={() => setCheck3(!check3)} />
                    <Text style={styles.textCheckBox}>กักตัว หรือเป็นผู้ที่มีความเสี่ยงสูง</Text>
                </View>
                <Text style={styles.header}>กักตัวเนื่องจาก (ทำเฉพาะกรณีกักตัว)</Text>
                <TextInput style={styles.input}></TextInput>
                <Text style={styles.header}>ภาพหลักฐานแสดงการติดโควิดหรือการกักตัว</Text>
                <TouchableOpacity style={styles.upload} onPress={handleChoosePhoto}>
                    <Ionicons name="cloud-upload-outline" size={20} style={{ marginRight: 10 }}></Ionicons>
                    <Text>อัพโหลดรูปภาพ</Text>
                </TouchableOpacity>
                <Text style={styles.header}>เริ่มติดโควิดหรือทราบว่าติดโควิดหรือต้องกักตัวตั้งแต่วันที่</Text>
                <TouchableOpacity onPress={openDatePicker} style={styles.datepicker}>
                    <Ionicons name="calendar-outline" size={20} style={{ marginRight: 10 }}></Ionicons>
                    <Text>เลือกวันที่</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submit}>
                    <Ionicons name="send-outline" size={20} style={{ marginRight: 10 }}></Ionicons>
                    <Text>ส่งข้อมูล</Text>
                </TouchableOpacity>
            </ScrollView>
            <DatePicker
                isVisible={showDatePicker}
                mode={'single'}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 40,

    },
    submit: {
        padding: 10,
        backgroundColor: '#0CD59D',
        alignItems: 'center',
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
    },
    header: {
        fontSize: 16,
        marginTop: 20
    },
    topic: {
        fontSize: 22,
        marginTop: 30
    },
    input: {
        height: 40,
        borderWidth: 0.5,
        padding: 10,
        marginTop: 20,
        borderColor: 'grey',
        borderRadius: 10
    },
    upload: {
        padding: 10,
        backgroundColor: '#rgb(119,203,229)',
        alignItems: 'center',
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10

    },
    datepicker: {
        padding: 10,
        backgroundColor: '#E6736A',
        alignItems: 'center',
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10

    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        paddingVertical: 15,
    },
    text: {
        fontSize: 15
    },
    checkbox: {
        marginRight: 10
    },
    textCheckBox: {
        fontSize: 15
    }

})

export default Form;