
import { FAB } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Modal, FlatList } from 'react-native';
import { CheckBox } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';


export default function App() {
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const addItem = () => {
        if (task.trim() === "") return;
        // Editing new task.
        if (isEditing) {
            setTaskList(perv => perv.map(
                item => (item.id === editingId ? { ...item, title: task } : item)
            ))
            setIsEditing(false);
            setEditingId(null)
        } else {
            // Adding New Task at the top......1234567890
            // setTaskList(prev => [...prev, { id: Date.now().toString(), title: task, Done: false }]);
            const newTask={id:Date.now().toString(),title:task,Done:false}
            const upadteList=[newTask,...taskList];
            const sortedList=upadteList.sort((a,b)=>a.Done-b.Done)
            setTaskList(sortedList)

        }
        setTask("");
        setShowModal(false);

    };

    const toggleCheckBox = (id) => {
        const upadteList = taskList.map(item =>
            item.id === id ? { ...item, Done: !item.Done } : item
        );
 // Sort the updated list
        const sortedList =upadteList.sort((a,b)=>a.Done-b.Done)

        setTaskList(sortedList);
    }
    // Delete the Task
    const deleteTask = (id) => {
        setTaskList(prev => prev.filter(task => task.id !== id));
    };

    return (
        <View style={styles.container}>
            {/* Status Bar Color */}
            <StatusBar backgroundColor="grey" barStyle="light-content" />

            {/* Your other components */}
            <Text style={{
                fontSize: 25, textAlign: "center", margin: 5,
                color: "white", backgroundColor: "grey"
            }}>ToDo List.</Text>
            <FlatList
                data={taskList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.flatlist}>
                        <Text style={styles.dateText}>
                            Date:- {new Date().toLocaleDateString()}
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 10 // optional spacing
                        }}>

                            {/* Left side: Serial Number */}
                            <Text style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "grey",
                            }}>
                                {index + 1}.
                            </Text>

                            {/* Right side: Edit and Delete Icons */}
                            <View style={{ flexDirection: "row", gap: 20 }}>
                                {/* Edit  Icons */}
                                <Ionicons
                                    name="create-outline"
                                    size={25}
                                    color="grey"
                                    onPress={() => {
                                        setTask(item.title);
                                        setEditingId(item.id);
                                        setIsEditing(true);
                                        setShowModal(true);
                                    }}
                                />

                                {/* : Delete  Icons */}
                                <Ionicons
                                    name="trash"
                                    size={25}
                                    color="grey"
                                    onPress={() => deleteTask(item.id)}
                                />

                            </View>

                        </View>


                        {/* Checkbox coding */}

                        <CheckBox
                            checked={item.Done}
                            onPress={() => toggleCheckBox(item.id)}
                            title={
                                <View>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        textDecorationLine: item.Done ? "line-through" : "none",
                                        textDecorationColor: "black",
                                        color: item.Done ? "grey" : "black",
                                    }}>{item.title}</Text>

                                </View>
                            } />
                    </View>
                )} />
            <FAB
                placement="right"
                visible={true}
                icon={{ name: 'add', color: 'white' }}
                color="grey"
                onPress={() => setShowModal(true)}
            />
            {/* //Modal View */}

            {/* Modal Component - now properly integrated */}
            <Modal
                transparent={true}
                visible={showModal}
            >
                <View style={styles.centerView}>
                    <View style={styles.modelView}>
                        <TextInput
                            style={styles.txtinput}
                            placeholder='Enter Your Work'
                            value={task}
                            onChangeText={setTask}
                        />

                        <View style={styles.buttonContainer}>
                           <Button
                                title="Cancel"
                                onPress={() => {
                                    setShowModal(false);
                                    setTask("");           // clear input
                                    setIsEditing(false);   // stop editing mode
                                    setEditingId(null);    // clear the editing ID
                                }}
                            />



                            <Button
                                title={isEditing ? "Update" : "Add"}
                                onPress={addItem} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative', // Important for FAB positioning
    },

    dateText: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "bold",
        color: 'grey'
    },

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
    },
    flatlist: {
        flex: 1,
        fontSize: 20,
        padding: 5,
        backgroundColor: '#eee',
        marginBottom: 10,
        borderRadius: 5,
    }

});