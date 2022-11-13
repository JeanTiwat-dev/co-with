import { Zocial } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    useWindowDimensions
} from "react-native";

const EditProfile = () => {
    const {width} = useWindowDimensions();
    
    return (
        <ScrollView>
            {/* header */}
            <View style={styles.header}>
                <Text>Test</Text>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({});

export default EditProfile;