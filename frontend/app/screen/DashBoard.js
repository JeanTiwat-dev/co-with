import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import path from "../../path";
function DashBoard() {
  const { width } = useWindowDimensions();
  const [allInfected, setAllInfected] = useState([]);
  const [allInfectedThai, setAllInfectedThai] = useState([]);

  const getInfectedThai = async () => {
    await axios
      .get(`https://covid19.ddc.moph.go.th/api/Cases/today-cases-all`)
      .then((res) => {
        setAllInfectedThai(res.data[0]);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInfected = async () => {
    await axios
      .get(`${path}/getInfected`)
      .then((res) => {
        setAllInfected(res.data.length);
        console.log(res.data.length);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log(allInfectedThai.new_case);
  console.log(allInfectedThai.total_case);
  useEffect(() => {
    getInfectedThai();
    getInfected();
  }, []);
  return (
    <ScrollView style={{ width: width, paddingHorizontal: 25 }}>
      {/* content 1 */}
      <View style={styles.content1}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            padding: 20,
            fontSize: 15,
          }}
        >
          ผู้ติดเชื้อสะสมในคณะเทคโนโลยีสารสนเทศ
        </Text>
        <View style={{padding: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image source={require('../assets/coronavirus.png')} style={{ height: 100, width: 100 }} />
          <View style={{width: '70%', height: '90%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 28, fontWeight: 'bold', color: 'white'}}>{allInfected} ราย</Text>
          </View>
        </View>
      </View>
      <Text style={{fontSize: 20, marginTop: 20, fontWeight: 'bold'}}>Covid-19 ในประเทศไทย</Text>
      {/* content 2 */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, flexWrap: 'wrap', paddingBottom: 20 }}>
        {/* box 1 */}
        <View
          style={[styles.content2_1, {backgroundColor: '#FFB072'}]}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            ยอดผู้ติดเชื้อสะสม
          </Text>
          <View style={{width: '100%', height: '85%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{allInfectedThai.total_case} ราย</Text>
          </View>
        </View>
        {/* box 2 */}
        <View
          style={[styles.content2_1, {backgroundColor: 'tomato'}]}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            ยอดผู้ติดเชื้อวันนี้
          </Text>
          <View style={{width: '100%', height: '85%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{allInfectedThai.new_case} ราย</Text>
          </View>
        </View>
        {/* box 3 */}
        <View
          style={[styles.content2_1, {backgroundColor: '#F7A4A4'}]}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          ยอดหายป่วยสะสม
          </Text>
          <View style={{width: '100%', height: '85%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{allInfectedThai.total_recovered} ราย</Text>
          </View>
        </View>
        {/* box 4 */}
        <View
          style={[styles.content2_1, {backgroundColor: '#90A17D'}]}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            ยอดหายป่วยวันนี้
          </Text>
          <View style={{width: '100%', height: '85%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{allInfectedThai.new_recovered} ราย</Text>
          </View>
        </View>
      </View>
      {/* content 3 */}
      {/* <View
        style={styles.content3}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          ยอดหายป่วยสะสม
        </Text>
        <View style={{padding: 20, flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '100%'}}>
          <View style={{width: '40%', height: '90%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 28, fontWeight: 'bold'}}>1 คน</Text>
          </View>
          <Image source={require('../assets/logohugg_mini.png')} style={{ height: 110, width: 180}} />
        </View>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content1: {
    backgroundColor: "#446091",
    //   justifyContent: "center",
    //   alignItems: "center",
    height: 220,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
  },
  content2_1: {
            width: "47%",
            height: 175,
            marginTop: 20,
            borderRadius: 30,
            padding: 20,
    shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
  },
  content3: {
    height: 205,
    backgroundColor: "#90A17D",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 30,
    padding: 20,
    shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
  },
});
export default DashBoard;