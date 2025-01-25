// screens/BarcodeScanner.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const BarcodeScanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraVisible, setCameraVisible] = useState(false);

    // Request camera permission on mount
    useEffect(() => {
        const getCameraPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getCameraPermission();
    }, []); // Empty dependency array to only run once when component mounts

    // Show camera when the button is pressed
    const handleScanPress = () => {
        setCameraVisible(true); // Only show the camera after permission is granted
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission...</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Text>Barcode Scanner</Text>
            {!cameraVisible ? (
                <Button title="Scan Barcode" onPress={handleScanPress} />
            ) : (
                <Camera style={styles.camera} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
});

export default BarcodeScanner;
