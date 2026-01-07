import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Constants from 'expo-constants';

import { Homework } from './types';
import { HomeworkItem } from './components/HomeworkItem';
import Celebration from './components/Celebration';

export default function App() {
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [inputText, setInputText] = useState('');
  const celebrationRef = useRef<any>(null);

  const addHomework = () => {
    if (inputText.trim().length === 0) return;

    const newItem: Homework = {
      id: uuidv4(),
      title: inputText.trim(),
      completed: false,
    };

    setHomeworks([newItem, ...homeworks]); // Add to top
    setInputText('');
  };

  const toggleHomework = (id: string) => {
    setHomeworks(prev => prev.map(item => {
      if (item.id === id) {
        const newCompleted = !item.completed;
        if (newCompleted) {
          // Trigger celebration
          if (celebrationRef.current) {
            celebrationRef.current.start();
          }
        }
        return { ...item, completed: newCompleted };
      }
      return item;
    }));
  };

  const deleteHomework = (id: string) => {
    setHomeworks(prev => prev.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>子供の宿題リスト 📝</Text>
        </View>

        <View style={styles.content}>
          <FlatList
            data={homeworks}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <HomeworkItem
                item={item}
                onToggle={toggleHomework}
                onDelete={deleteHomework}
              />
            )}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>宿題はまだありません！</Text>
                <Text style={styles.emptySubText}>「追加」ボタンで登録してね</Text>
              </View>
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="宿題を入力してね..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addHomework}
          />
          <TouchableOpacity onPress={addHomework} style={styles.addButton}>
            <Text style={styles.addButtonText}>追加</Text>
          </TouchableOpacity>
        </View>

        <Celebration ref={celebrationRef} />
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Constants.statusBarHeight,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f1f3f5',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#f1f3f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4dabf7',
    height: 50,
    paddingHorizontal: 24,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#495057',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#868e96',
  },
});
