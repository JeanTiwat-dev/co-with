import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
  Dimensions,
  Pressable
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import NewsDetail from "./NewsDetail";
import Card from "../component/Card";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import path from "../../path";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const NewsPage = ({ route }) => {
  const router = useNavigation();
  const [data, setData] = useState([]);
  const isCarousel = useRef();
  const { width } = useWindowDimensions();
  let s = Dimensions.get("window").width + 80;
  let i = Math.round(s * 0.7);
  const [index, setIndex] = useState(0);
  const [backup, setBackup] = useState([]);
  const [user, setUser] = useState([]);

  // carouse
  const CarouselCardItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{padding : 10}} key={index} onPress={()=>{
        router.navigate('NewsDetail', {data: item});
      }}>
        <View style={styles.container}>
        <Image source={{uri : `${path}${item.image}`}} style={styles.imageCarousel} />
        <View style={{paddingHorizontal: 20, paddingVertical:10}}>
        <Text style={styles.header} numberOfLines={2}>{item.title}</Text>
        <Text numberOfLines={3} style={styles.body}>
          {item.content}
        </Text>
        </View>
        </View>
      </TouchableOpacity>
    );
  };
  const getNews = async () => {
    await axios
      .get(`${path}/news`)
      .then((res) => {
        setData(res.data);
        setBackup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  async function Getuser() {
    const datauser = await AsyncStorage.getItem("@user");
    // console.log(JSON.parse(datauser)._id);
    if (datauser) {
      await axios
        .post(`${path}/users/getUserId`, { _id: JSON.parse(datauser)._id })
        .then((res) => {
          // console.log(res.data[0].img);
          console.log(res.data)
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
    getNews();
    const willFocusSubscription = router.addListener("focus", () => {
      getNews();
    });
    return willFocusSubscription;
  }, []);
  
  const functionCombined = () => {
    Clipboard.setStringAsync(`${contact.firstname + " " + contact.lastname}`);
    toast.show("Copied to clipboard", {
      type: "success",
      placement: "bottom",
      duration: 2000,
      // offsetTop: 300,
    });
  };
  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.topiccontainer}>
      <Text style={styles.topic}>Announcement</Text>
      {(user.role === "PR" || user.role === "admin") &&
      <View
                style={{
                  // flexDirection: "row",
                  // width: "100%",
                  // justifyContent: "center",
                }}
              >
                <Pressable
                  style={[
                    styles.buttoncreate,
                    // styles.buttonClose,
                    // { marginLeft: 5, marginRight: 5 },
                  ]}
                  onPress={() => {
                    router.navigate("UploadNews");
                  }}
                >
                  <Ionicons
            name="add-outline"
            size={20}
          ></Ionicons>
                </Pressable>
              </View>}
              {(user.role === "PR" || user.role === "admin") && 
              <View
                style={{
                  // flexDirection: "row",
                  // width: "100%",
                  // justifyContent: "center",
                }}
              >
                <Pressable
                  style={[
                    styles.buttonedit,
                    // styles.buttonClose,
                    // { marginLeft: 5, marginRight: 5 },
                  ]}
                  onPress={() => {
                    router.navigate("EditNews");
                  }}
                >
                  <Ionicons
            name="create-outline"
            size={20}
          ></Ionicons>
                </Pressable>
              </View>}
      
      </View>
      <View style={{ marginTop: 25 }}>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={width}
          itemWidth={width - 80}
          inactiveSlideShift={0}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true}
        />
        {/* index page */}
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 5,
            height: 5,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
      <View style={styles.newsContainer}>
        {data.map((data) => (
          <TouchableOpacity key={data._id} onPress={()=>{
            router.navigate('NewsDetail', {data: data});
          }}>
            <Card>
              <View style={styles.imageContainer}>
                <Image style={styles.newsImage} source={{uri : `${path}${data.image}`}} />
              </View>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle} numberOfLines={1}>{data.title}</Text>
                <View>
                  <Text numberOfLines={3}>{data.content}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    // width : '100%',
    // paddingHorizontal : 40,
  },
  topiccontainer : {
    // flex : 1,
    flexDirection : 'row',
    flexWrap : 'wrap',
    justifyContent : 'space-between',
    paddingHorizontal : 40,
    alignContent: 'center',
    marginTop: 10
  },
  buttoncreate: {
    backgroundColor: "#16A34A",
    width: 50,
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
    marginTop: 10,
    marginLeft: 10
  },
  buttonedit: {
    backgroundColor: "#FBBF24",
    width: 50,
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
    marginTop: 10,
    paddingLeft: 3
  },
  topic: {
    fontSize: 25,
    marginTop: 20,
    fontWeight : 'bold'
  },
  newsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 40,
  },
  newsImage: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    height: "40%",
    
  },
  newsContent: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  header: {
    color: "#222",
    fontSize: 20,
    fontWeight: "bold",
    // paddingLeft: 20,
    // paddingTop: 20,
  },
  body: {
    color: "#222",
    fontSize: 10,
    paddingTop: 5
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  imageCarousel: {
    width: "100%",
    height: 100,
    borderTopLeftRadius :8,
    borderTopRightRadius : 8,
  },
  newsTitle: {
    fontWeight: "bold",
  },
  container : {
    backgroundColor : 'white',
    // paddingBottom : 20,
    // padding : 10,
    borderRadius : 10,
    // overflow : 'hidden',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    paddingBottom: 10,
  }
});

export default NewsPage;
