import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";

const ListItem = ({ name, symbol, currentPrice, pricedChangePercantage24h, logoUrl, onPress }) => {

    const priceChangeColor = pricedChangePercantage24h > 0 ? '#34c759' : '#FF3B30';
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemWrapper}>
                {/* Left Sider */}
                <View style={styles.leftWrapper}>
                    <Image source={{uri: logoUrl}}
                           style={styles.image} />
                    <View style={styles.titlesWrapper}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
                    </View>
                </View>
                {/* Right Side */}
                <View style={styles.rightWrapper}>
                    <Text style={styles.title}>${currentPrice.toLocaleString('en-US', {currency: 'USD'})}</Text>
                    <Text style={[styles.subtitle,{
                        color: priceChangeColor,
                    }]}>{Number(pricedChangePercantage24h).toFixed(2)}%</Text>
                </View>
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    itemWrapper: {
        paddingHorizontal:16,
        marginTop:24,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"

    },
    leftWrapper: {
        flexDirection:"row",
        alignItems:"center"
    },
    image: {
        width:48,
        height:48,
    },
    titlesWrapper: {
        marginLeft:8,
    },

    title: {
        fontSize:18,
    },
    subtitle: {
        fontSize:14,
        color:'#A9ABB1',
    },
    rightWrapper: {
        alignItems:'flex-end'
    },
});
export default ListItem
