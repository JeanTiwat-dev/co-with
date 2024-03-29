import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

function Card(props){
    const {width} = useWindowDimensions();
    return (
        <View style={[styles.card, {width: width*0.38}]}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card : {
        borderRadius : 6,
        elevation : 3,
        backgroundColor : '#fff',
        shadowOffset : {width: 1, height : 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        // marginHorizontal: 4,
        marginVertical: 6,
        // width : 165,
        height: 160,
        flex: 1,
        // flexWrap : 'wrap'
        // overflow : 'hidden',
        marginBottom : 20,
        overflow : 'hidden'
    },
    cardContent: {
        // marginHorizontal: 18,
        // marginVertical: 10
    },
})

export default Card;