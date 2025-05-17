import { StyleSheet, View, ViewStyle, TextStyle, Text, Modal, TouchableOpacity, Dimensions, ViewProps } from 'react-native';
import Divider from '../Divider'
import { useSongContext } from '../../context/SongContext/SongContext'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Label from '../reusables/Label/Label'
import TitleSubtitle from '../reusables/TitleSubtitle/TitleSubtitle'
import React from 'react'

const { height, width } = Dimensions.get("window");

interface ChartItemProps extends ViewProps {
    title: string
    artist: string
    index: number
}

const ChartItem = ({
    title,
    artist,
    index,
    style,
}: ChartItemProps): React.JSX.Element => {

    return (
        <View key={index} style={style}>
            {/* implement ... when its too long */}
            <TitleSubtitle title={title} subTitle={artist} />
        </View>
    );
};

interface ChartItemStyles {

}

const styles = StyleSheet.create<ChartItemStyles>({
    
});

export default ChartItem;