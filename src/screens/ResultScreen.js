// screens/ResultScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultScreen = ({ route }) => {
    const { barcode } = route.params;
    const [halalStatus, setHalalStatus] = useState(null);

    // Simulate checking halal status based on barcode
    useEffect(() => {
        // Here you would typically make an API call to check if the product is halal
        // For demonstration, we'll just use a mock response
        const checkHalalStatus = async () => {
            // Mock API call
            const response = await fetch(`https://api.example.com/check-halal/${barcode}`);
            const data = await response.json();
            setHalalStatus(data.isHalal); // Assume the API returns { isHalal: true/false }
        };
        checkHalalStatus();
    }, [barcode]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan Result</Text>
            <Text>Barcode: {barcode}</Text>
            {halalStatus !== null && (
                <Text>{halalStatus ? 'This product is Halal!' : 'This product is NOT Halal.'}</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ResultScreen;
