import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ResultScreen = ({ route }) => {
    const { barcode } = route.params;
    const [loading, setLoading] = useState(true);
    const [isHalal, setIsHalal] = useState(false);

    useEffect(() => {
        axios.get(`https://api.eathalal.com/check/${barcode}`)
            .then(response => {
                setIsHalal(response.data.isHalal);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [barcode]);

    if (loading) {
        return <ActivityIndicator size="large" color="#00ff00" />;
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, isHalal ? styles.halal : styles.notHalal]}>
                {isHalal ? 'This product is Halal' : 'This product is NOT Halal'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20, fontWeight: 'bold', margin: 20 },
    halal: { color: 'green' },
    notHalal: { color: 'red' },
});

export default ResultScreen;
