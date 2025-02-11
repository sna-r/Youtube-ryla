// index.tsx
import React, { useRef, useEffect, useState } from 'react';
import { BackHandler, Alert, View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const IndexPage = () => {
  const webViewRef = useRef<WebView | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [canGoBack, setCanGoBack] = useState<boolean>(false); // Track if WebView can go back
  const websiteUrl = 'https://m.youtube.com'; // Replace with your website URL

  useEffect(() => {
    const backAction = () => {
      if (webViewRef.current && canGoBack) {
        webViewRef.current.goBack(); // Navigate back in WebView history
        return true; // Prevent default back action
      }

      // Show a confirmation dialog before exiting the app
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );

      return true; // Prevent default back action until user confirms
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Cleanup the event listener
  }, [canGoBack]); // Re-run effect when canGoBack changes

  return (
    <View style={styles.container}>
      {/* Centered Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        ref={(ref) => (webViewRef.current = ref)}
        source={{ uri: websiteUrl }}
        style={{ flex: 1 }}
        onLoadEnd={() => setIsLoading(false)} // Hide loader when the page finishes loading
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack); // Update canGoBack based on WebView's state
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#fff', // Optional: Add a background color for better visibility
    zIndex: 1, // Ensure it appears above the WebView
  },
});

export default IndexPage;