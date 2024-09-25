import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Row from './components/Row';
import { useCallback, useState, useEffect } from 'react';
import Add from './components/Add';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function App() {
    const [data, setData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    const DATA_STORAGE_KEY = '@todo_list_data';

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedData = await AsyncStorage.getItem(DATA_STORAGE_KEY);
                if (savedData) {
                    setData(JSON.parse(savedData));
                }
            } catch (error) {
                console.error('Failed to load data', error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const saveData = async () => {
            try {
                await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
            } catch (error) {
                console.error('Failed to save data', error);
            }
        };

        if (data.length > 0) {
            saveData();
        }
    }, [data]);

    const add = useCallback((name) => {
        const newItem = {
            id: uuid.v4(),
            name: name,
        };
        const tempData = [...data, newItem];
        setData(tempData);
    }, [data]);

    const select = useCallback((id) => {
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter(selectedId => selectedId !== id);
            } else {
                return [...prevSelectedIds, id];
            }
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Todo list</Text>
            <Add add={add} />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                extraData={selectedIds}
                renderItem={({ item }) => (
                    <Row item={item} selectedIds={selectedIds} select={select} />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    header: {
        fontSize: 24,
        marginBottom: 16,
    },
});
