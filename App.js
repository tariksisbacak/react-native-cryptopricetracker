import {StatusBar} from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import ListItem from "./components/ListItem";
import Chart from "./components/Chart";
import React, {useRef, useState, useMemo, useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import {getMarketData} from "./services/cryptoService";

const ListHeader = () => (
    <>
        <View style={styles.titleWrapper}>
            <Text style={styles.largeTitle}>Markets</Text>
        </View>
        <View style={styles.divider}/>
    </>
);


export default function App() {

    const [data,setData] = useState([]);
    const [selectedCoinData, setSelectedCoinData] = useState(null);

    useEffect(() => {
        const fetchMarketData = async () => {
            const marketData = await getMarketData();
            setData(marketData);
        }

        fetchMarketData();

    }, []);

    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['50%'], []);

    const openModal = (item) => {
        setSelectedCoinData(item);
        bottomSheetModalRef.current.present();
    }
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                <SafeAreaView style={styles.container}>

                    <FlatList data={data}
                              renderItem={({item}) => (
                                  <ListItem
                                      name={item.name}
                                      symbol={item.symbol}
                                      currentPrice={item.current_price}
                                      pricedChangePercantage24h={item.price_change_percentage_24h}
                                      logoUrl={item.image}
                                      onPress={() => openModal(item)}
                                  />
                              )}
                              ListHeaderComponent={<ListHeader/>}

                    />
                </SafeAreaView>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    style={styles.bottomSheet}
                >
                    {selectedCoinData ? (
                        <Chart
                            currentPrice={selectedCoinData.current_price}
                            logoUrl={selectedCoinData.image}
                            name={selectedCoinData.name}
                            pricedChangePercantage24h={selectedCoinData.price_change_percentage_24h}
                            sparkline={selectedCoinData.sparkline_in_7d.price}
                            symbol={selectedCoinData.symbol}
                        />
                    ) : null}

                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleWrapper: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    largeTitle: {
        fontSize: 24,
        fontWeight: "bold"
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#A9ABB1',
        marginHorizontal: 16,
        marginTop: 16
    },
    bottomSheet: {}
});
