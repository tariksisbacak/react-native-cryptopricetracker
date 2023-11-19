import {StyleSheet, Text, View, Image, Dimensions} from "react-native";
import React, {useEffect, useState} from "react";
import {useSharedValue} from 'react-native-reanimated';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

export const {width: SIZE} = Dimensions.get('window');

const Chart = ({currentPrice, logoUrl, name, symbol, pricedChangePercantage24h, sparkline}) => {

    const latestCurrentPrice = useSharedValue(currentPrice);
    const [chartReady, setChartReady] = useState(false);
    const priceChangeColor = pricedChangePercantage24h > 0 ? '#34c759' : '#FF3B30';

    useEffect(() => {
        latestCurrentPrice.value = currentPrice;

        setTimeout(() => {
            setChartReady(true);
        }, 0)

    }, [currentPrice]);

    return (
        <View style={styles.chartWrapper}>

            {/* Title */}
            <View style={styles.titlesWrapper}>
                <View style={styles.upperTitles}>
                    <View style={styles.upperLeftTitle}>
                        <Image source={{uri: logoUrl}} style={styles.image}/>
                        <Text>{name} ({symbol})</Text>
                    </View>
                    <Text style={styles.subtitle}>7d</Text>
                </View>
                <View style={styles.loverTitles}>
                    <Text
                        style={styles.boldTitle}>${latestCurrentPrice.value.toLocaleString('en-US', {currency: 'USD'})}</Text>
                    <Text
                        style={[styles.title, {color: priceChangeColor}]}>{Number(pricedChangePercantage24h).toFixed(2)}%</Text>
                </View>
            </View>

            {chartReady ?
                (<View style={styles.chartLineWrapper}>

                    <LineChart
                        data={{
                            datasets: [
                                {
                                    data: sparkline
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width - 100} // from react-native
                        height={220}
                        backgroundColor={"transparent"}

                        chartConfig={{

                            backgroundGradientFrom: "#fff",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientTo: "#fff",
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            strokeWidth: 2, // optional, default 3
                            barPercentage: 1.5,
                            useShadowColorFromDataset: false // optional
                        }}
                        withDots={false}
                        withShadow={false}
                        withInnerLines={false}
                        withOuterLines={false}
                        withVerticalLines={false}
                        withHorizontalLines={false}
                        withVerticalLabels={false}
                        withHorizontalLabels={false}
                        onDataPointClick={data => {
                            console.log(data, 'data');
                        }}
                        bezier

                        style={{
                            marginVertical: 0,
                        }}
                    />
                </View>) :

                null
            }

        </View>
    );

}

const styles = StyleSheet.create({
    chartWrapper: {
        margin: 16,
    },
    titlesWrapper: {},
    upperTitles: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    upperLeftTitle: {},
    image: {
        width: 24,
        height: 24,
        marginRight: 4
    },
    subtitle: {
        fontSize: 14,
        color: '#A9ABB1'
    },
    loverTitles: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    boldTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },
    title: {
        fontSize: 18
    },
    chartLineWrapper: {
        margin: 0
    }
})

export default Chart;
