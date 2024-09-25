import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

export default function Row({ item, selectedIds, select }) {
    const isSelected = selectedIds.includes(item.id);

    return (
        <TouchableOpacity onPress={() => select(item.id)}>
            <View style={styles.row}>
                <Text style={[styles.text, isSelected && styles.strikeThrough]}>
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    row: {
        padding: 16
    },
    text: {
        fontSize: 18,
    },
    strikeThrough: {
        textDecorationLine: 'line-through'
    },
});
