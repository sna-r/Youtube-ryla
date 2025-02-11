// index.tsx
import React from 'react';
import { WebView } from 'react-native-webview';

const IndexPage = () => {
  const websiteUrl = 'https://m.youtube.com'; // Replace with your website URL

  return (
    <WebView
      source={{ uri: websiteUrl }}
      style={{ flex: 1 }} // Ensure the WebView takes up the full screen
    />
  );
};

export default IndexPage;