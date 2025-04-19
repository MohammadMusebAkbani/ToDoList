    // TaskModal.js
import React from 'react';
import { View, TextInput, Button, Modal, StyleSheet } from 'react-native';

export default function TaskModal({ visible, task, setTask, onCancel, onAdd, isEditing }) {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.centerView}>
        <View style={styles.modelView}>
          <TextInput
            style={styles.txtinput}
            placeholder='Enter Your Work'
            value={task}
            onChangeText={setTask}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title={isEditing ? "Update" : "Add"} onPress={onAdd} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modelView: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 5,
    borderRadius: 10,
    shadowColor: "black",
    elevation: 5,
    width: '85%',
  },
  txtinput: {
    borderColor: "black",
    borderWidth: 1,
    fontWeight: "bold",
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 1,
    backgroundColor: "#eee",
    borderRadius: 15
  }
});
