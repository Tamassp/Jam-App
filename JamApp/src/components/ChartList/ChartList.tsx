import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle, Text, Modal, TouchableOpacity, ModalProps, ViewProps } from 'react-native';
import Divider from '../Divider'

interface ChartListProps extends ViewProps {
    // probably charts will be pulled from context
    charts?: string[];
}

const ChartList = ({
    // Implement props for the ChartList component here
    charts = [],
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

    const [modalVisible, setModalVisible] = React.useState(true);

    const handleBack = () => {
        setModalVisible(false);
        console.log('back');
        
    }


    return (

        <Modal transparent={true} visible={modalVisible} animationType='slide'>
            {/* has to slide in from left */}
            {/* Export the container as a Modal component **BUT MODAL IS THE SYSTEM WINDOW SO create popup instead*/}
            {/* maybe it can be modal */}
            <View style={styles.container}>
                <Text style={styles.title}>Chart List</Text>
                <Divider />
                {dummyCharts.map((chart, index) => (
                    <View key={index}>
                        {/* implement ... when its too long */}
                        <Text>{chart.title} - {chart.artist}</Text>
                        <Divider />
                    </View>
                ))}
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
}

const styles = StyleSheet.create<ChartListStyles>({
    backButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    container: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#555C5F',
        maxWidth: 512,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    
});

export default ChartList;
