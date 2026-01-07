import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Homework } from '../types';

interface Props {
    item: Homework;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const HomeworkItem: React.FC<Props> = ({ item, onToggle, onDelete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => onToggle(item.id)}
                style={[styles.checkbox, item.completed && styles.checked]}
            >
                {item.completed && <Ionicons name="checkmark" size={24} color="#fff" />}
            </TouchableOpacity>

            <Text style={[styles.title, item.completed && styles.completedTitle]}>
                {item.title}
            </Text>

            <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={24} color="#ff6b6b" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    checkbox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#4dabf7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    checked: {
        backgroundColor: '#4dabf7',
    },
    title: {
        flex: 1,
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },
    completedTitle: {
        color: '#adb5bd',
        textDecorationLine: 'line-through',
    },
    deleteButton: {
        padding: 8,
    },
});
