import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function BarcodeScanner() {
  const [barcode, setBarcode] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBarcodeChange = (text) => {
    setBarcode(text);
  };

  const handleSearch = async () => {
    setLoading(true);
    setMessage(''); // Reset message before making the API call

    try {
      // Make the API request to Open Food Facts
      const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);

      if (response.data.status === 1) {
        const product = response.data.product;
        const halalCert = product['halal'] || 'no'; // Check if the product is halal based on the data available
        const ingredientsText = product.ingredients_text || '';

        const haramIngredients = ['pork', 'alcohol', 'gelatin', 'lard', 'enzymes', 'rennet']; // List of haram-related ingredients

        // First check if there's an explicit halal certification
        if (halalCert.toLowerCase() === 'yes') {
          setStatus('halal');
          setMessage(`The product with barcode ${barcode} is HALAL.`);
        } else {
          // If no direct certification, check ingredients for haram items
          const isHaram = haramIngredients.some(ingredient => ingredientsText.toLowerCase().includes(ingredient));

          if (isHaram) {
            setStatus('haram');
            setMessage(`The product with barcode ${barcode} is HARAM.`);
          } else {
            // If no haram ingredients, we assume the product is halal
            setStatus('halal');
            setMessage(`The product with barcode ${barcode} is likely HALAL.`);
          }
        }
      } else { //product not found message
        setMessage('Product not found or invalid barcode.');
      }
    } catch (error) { //error message
      setMessage('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
// UI
  return ( //UI
    <View style={styles.container}>
      <Text style={styles.title}>Enter Product Barcode</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter barcode"
        keyboardType="numeric"
        value={barcode}
        onChangeText={handleBarcodeChange}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      {message ? <Text style={styles.resultText}>{message}</Text> : null}
    </View>
  );
}
//styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center',// it will align the content of the container to the center
    alignItems: 'center', // it will align the content of the container to the center
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    marginBottom: 30,
    paddingLeft: 10,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 30,
    color: 'green',
  },
  loadingText: { //loading text
    fontSize: 18,
    marginTop: 20,
    color: 'blue',
  },
});
