// TaskItem.js
import React from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';

// Ye sab DATA FLATLIST e Ander Ka Hai

export default function TaskItem({ item, index, onEdit, onDelete, onToggle }) {
  return (
    <View style={{
      flex: 1,
      fontSize: 20,
      padding: 5,
      backgroundColor: '#eee',
      marginBottom: 10,
      borderRadius: 5,
    }}>
      <Text style={{
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "bold",
        color: 'grey'
      }}>
        Date:- {new Date().toLocaleDateString()}
      </Text>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10
      }}>
        <Text style={{
          fontSize: 15,
          fontWeight: "bold",
          color: "grey",
        }}>
          {index + 1}.
        </Text>

        <View style={{ flexDirection: "row", gap: 20 }}>
          <Ionicons name="create-outline" size={25} color="grey" onPress={onEdit} />
          <Ionicons name="trash" size={25} color="grey" onPress={onDelete} />
        </View>
      </View>

      <CheckBox
        checked={item.Done}
        onPress={onToggle}
        title={
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            textDecorationLine: item.Done ? "line-through" : "none",
            textDecorationColor: "black",
            color: item.Done ? "grey" : "black",
          }}>{item.title}</Text>
        }
      />
    </View>
  );
}
