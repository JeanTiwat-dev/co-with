import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import NewsDetail from "./NewsDetail";
import Card from "../component/Card";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import path from "../../path";


const NewsPage = ({ navigation }) => {
  const router = useNavigation();
  const [data, setData] = useState([]);
  const isCarousel = useRef();
  const { width } = useWindowDimensions();
  let s = Dimensions.get("window").width + 80;
  let i = Math.round(s * 0.7);
  const [index, setIndex] = useState(0);
  const [backup, setBackup] = useState([]);
  const CarouselCardItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{padding : 10}} key={index} onPress={()=>{
        router.navigate('NewsDetail', {data: item});
      }}>
        <View style={styles.container}>
        <Image source={{uri : `${path}${item.image}`}} style={styles.imageCarousel} />
        <Text style={styles.header} numberOfLines={2}>{item.title}</Text>
        <Text numberOfLines={3} style={styles.body}>
          {item.content}
        </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const getNews = async () => {
    await axios
      .get(`${path}/getNews`)
      .then((res) => {
        setData(res.data);
        setBackup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNews();
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
  return (
    <ScrollView style={styles.scrollview}>
      <Text style={styles.topic}>Announcement</Text>
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
  topic: {
    fontSize: 28,
    paddingHorizontal: 40,
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
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: "#222",
    fontSize: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
    paddingBottom: 20
  }
});

export default NewsPage;
