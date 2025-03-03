import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
const DailyQuote = () => {
   const [quote, setQuote] = useState('');
   const [loading, setLoading] = useState(false);
   const fetchQuote = async () => {
       setLoading(true);
       try {
           const response = await fetch('https://dummyjson.com/quotes/random');
           if (response.ok) {
               const data = await response.json();
               setQuote(data.quote);
           } else {
               console.error('Error fetching quote:', response.status);
           }
       } catch (error) {
           console.error('Error fetching quote:', error);
       } finally {
           setLoading(false);
       }
   };
   useEffect(() => {
       fetchQuote();
   }, []);
   return (
<View style={styles.container}>
           {loading ? (
<ActivityIndicator size="large" color="#ff6347" style={styles.loader} />
           ) : (
<Text style={styles.quoteText}>"{quote}"</Text>
           )}
</View>
   );
};
const styles = StyleSheet.create({
   container: {
       justifyContent: 'center',
       alignItems: 'center',
       paddingHorizontal: 20,
       paddingVertical: 15,
       borderWidth: 2,
       borderColor: '#ffffff',
       borderRadius: 15,
       backgroundColor: '#f9f9f9',
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 4 },
       shadowOpacity: 0.1,
       shadowRadius: 6,
       elevation: 5,
   },
   quoteText: {
       fontSize: 20,
       fontStyle: 'italic',
       color: '#333',
       textAlign: 'center',
       marginBottom: 10,
       fontFamily: 'Georgia', // Choose a more elegant font for the quote
       letterSpacing: 1.2,
   },
   loader: {
       marginVertical: 20,
   },
});
export default DailyQuote;