import { useState } from "react";
import {View, Text, StyleSheet, ScrollView, Image} from "react-native";


const NewsDetail = ({route}) => {
    console.log(route);
    // const news = props.news;
    const [news, setNews] = useState(route.params.data);
    return (
        <ScrollView>
            <Image source={{ uri : news.uri }} style={styles.image} />
            <View style={styles.container}>
                <Text style={styles.title}>{news.title}</Text>
                <Text style={styles.content}>{news.content}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image : {
        width: '100%',
        height : 200
    },
    container : {
        paddingHorizontal : 30,
        marginTop : 20
    },
    title : {
        fontWeight : 'bold',
        fontSize : 22
    },
    content : {
        marginTop : 20,
        fontSize : 18
    }
})
export default NewsDetail;