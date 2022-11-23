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

const EditNews = () => {
    const router = useNavigation();
    const [data, setData] = useState([]);
    const getNews = async () => {
      await axios
        .get(`${path}/getNews`)
        .then((res) => {
          setData(res.data);
          // setBackup(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      getNews();
      const willFocusSubscription = router.addListener("focus", () => {
        getNews();
      });
  
      return willFocusSubscription;
    }, []);
      
    return (    <ScrollView style={styles.scrollview}>
        <Text style={styles.topic}>Edit News</Text>
        <View style={styles.newsContainer}>
          {data.map((data) => (
            <TouchableOpacity key={data._id} onPress={()=>{
              router.navigate('EditNewsDetails', {data: data});
            }}>
              <Card>
                <View style={styles.imageContainer}>
                  <Image style={styles.newsImage} source={{ uri: `${path}${data.image}` }} />
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
      </ScrollView>);
}

const styles = StyleSheet.create({
    scrollview: {
      // width : '100%',
      // paddingHorizontal : 40,
    },
    topic: {
      fontSize: 28,
      paddingHorizontal: 40,
      marginTop: 30,
      fontWeight: 'bold'
    },
    newsContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
      paddingHorizontal: 35,
      marginTop: 30,
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
    },
    newsTitle: {
      fontWeight: "bold",
    },
  });

export default EditNews;