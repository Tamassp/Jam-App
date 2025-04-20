import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle, TextStyle, Text, Modal, TouchableOpacity, Dimensions, ViewProps } from 'react-native';
import Divider from '../Divider'
import { useSongContext } from '../../context/SongContext/SongContext'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import ChartItem from '../ChartItem'
import { ISong } from '../../interfaces/Interfaces'

const { height, width } = Dimensions.get("window");

interface ChartListProps extends ViewProps {
    // probably charts will be pulled from context
    charts?: string[];
    isChartListVisible: boolean;
    setIsChartListOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChartList = ({
    // Implement props for the ChartList component here
    charts = [],
    isChartListVisible,
    setIsChartListOpen
}: ChartListProps): JSX.Element => {
    const dummyCharts = [{
        title: 'Song 1',
        artist: 'Artist 1',
    },
    {
        title: 'Song 2',
        artist: 'Artist 2',
    },
    {
        title: 'Song 3',
        artist: 'Artist 3',
    },
    ]
    const {allSongs, allSongKeys, song, getAllSongs, getAllSongKeys, setSong, saveSong, loadSong} = useSongContext();

    // const [isModalVisible, setModalVisible] = React.useState(true);

    const translateX = useSharedValue(isChartListVisible ? 0 : -width); // Start from the left (off-screen)

    React.useEffect(() => {
        translateX.value = withTiming(isChartListVisible ? 0 : -width, { duration: 300 });
    }, [isChartListVisible]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const handleBack = () => {
        // setModalVisible(false);
        console.log('back');
        setIsChartListOpen(false)
    }

    useEffect(() => {
        getAllSongKeys()
    },[])

    const handleChartPress = (key: string) => {
        loadSong(key)
    }



    return (
        <Modal transparent={true} visible={isChartListVisible} style={animatedStyle}>
            {/* has to slide in from left */}
            {/* Export the container as a Modal component **BUT MODAL IS THE SYSTEM WINDOW SO create popup instead*/}
            {/* maybe it can be modal */}
            <View style={styles.container}>
                <Text style={styles.title}>Chart List</Text>
                <Divider />
                {/* {dummyCharts.map((chart, index) => (
                    <ChartItem key={index} title={chart.title} artist={chart.artist} index={index} />
                ))} */}
                <View style={styles.chartItemsContainer}>
                {allSongs.map((song: ISong, index) => (
                    <TouchableOpacity key={index} onPress={()=>handleChartPress(allSongKeys.some((key)=>key === `${song.title} - ${song.author}` ) ? `${song.title} - ${song.author}` : '')}>
                        {/* implement ... when its too long */}
                        <ChartItem title={song.title} artist={song.author} index={index} style={{marginTop: 8}} />
                    </TouchableOpacity>
                ))}
                </View>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

interface ChartListStyles {
    // Define styles for the ChartList component here
    backButton: ViewStyle;
    container: ViewStyle;
    title: TextStyle;
    chartItemsContainer: ViewStyle;
}

const styles = StyleSheet.create<ChartListStyles>({
    backButton: {
        position: 'absolute',
        top: 32, // needs to give space for the IoS system bar
        right: 16,
    },
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: width * 0.3, // 80% of screen width
        height: height,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    chartItemsContainer: {
        marginLeft: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 32,
        marginLeft: 16,
    },
    
});

export default ChartList;
