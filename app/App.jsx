import React, { useState } from 'react';
import { StyleSheet, View, FlatList, StatusBar } from 'react-native';
import { FAB } from '@rneui/themed';

import Header from './components/Header';
import TaskItem from './components/TaskItem';
import TaskModal from './components/TaskModal';


export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const addItem = () => {
    if (task.trim() === "") return;

    if (isEditing) {
      setTaskList(prev =>
        prev.map(item =>
          item.id === editingId ? { ...item, title: task } : item
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newTask = { id: Date.now().toString(), title: task, Done: false };
      const updateList = [newTask, ...taskList];
      const sortedList = updateList.sort((a, b) => a.Done - b.Done);
      setTaskList(sortedList);
    }

    setTask("");
    setShowModal(false);
  };

  const toggleCheckBox = (id) => {
    const updateList = taskList.map(item =>
      item.id === id ? { ...item, Done: !item.Done } : item
    );
    const sortedList = updateList.sort((a, b) => a.Done - b.Done);
    setTaskList(sortedList);
  };

  const deleteTask = (id) => {
    setTaskList(prev => prev.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="grey" barStyle="light-content" />
      
      <Header /> 

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
            // Task item is a component and from here i pass a props.
          <TaskItem item={item} index={index} onEdit={() => {
              setTask(item.title);
              setEditingId(item.id);
              setIsEditing(true);
              setShowModal(true);
            }}
            onDelete={() => deleteTask(item.id)}
            onToggle={() => toggleCheckBox(item.id)}
          />
        )}
      />

      <FAB
        placement="right"
        visible={true}
        icon={{ name: 'add', color: 'white' }}
        color="grey"
        onPress={() => setShowModal(true)}
      />
    {/* // Task Modal is a component and from here i pass a props. */}
      <TaskModal visible={showModal} task={task} setTask={setTask}
        onCancel={() => {
          setShowModal(false);
          setTask("");
          setIsEditing(false);
          setEditingId(null);
        }}
        onAdd={addItem}
        isEditing={isEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
