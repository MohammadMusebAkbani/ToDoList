// Header.js
import React from 'react';
import { Text } from 'react-native';

export default function Header() {
  return (
    <Text style={{
      fontSize: 25,
      textAlign: "center",
      margin: 5,
      color: "white",
      backgroundColor: "grey"
    }}>
      ToDo List.
    </Text>
  );
}
