// src/screens/social/ChatScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

// Mock messages for testing
const MOCK_MESSAGES = [
  {
    id: '1',
    text: 'Hey, I saw your question about React hooks',
    sender: 'them',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    text: "Yes, I'm having trouble with useEffect",
    sender: 'me',
    timestamp: '10:31 AM',
  },
  {
    id: '3',
    text: "Here's a simple example that might help...",
    sender: 'them',
    timestamp: '10:32 AM',
  },
  {
    id: '4',
    text: 'Thanks! That makes more sense now',
    sender: 'me',
    timestamp: '10:33 AM',
  },
];

const Message = ({ message }) => {
  const isMyMessage = message.sender === 'me';
  
  return (
    <View
      style={[
        styles.messageContainer,
        isMyMessage ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          isMyMessage ? styles.myMessageBubble : styles.theirMessageBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isMyMessage ? styles.myMessageText : styles.theirMessageText,
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[
            styles.messageTime,
            isMyMessage ? styles.myTimeText : styles.theirTimeText,
          ]}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
};

const ChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState('');
  const flatListRef = useRef(null);
  const { username } = route.params;

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>@{username}</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        ref={flatListRef}
        data={MOCK_MESSAGES}
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#B0B3B8"
          value={message}
          onChangeText={setMessage}
          multiline
          maxHeight={100}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    ...FONTS.bold,
    fontSize: 28,
    color: COLORS.primary,
  },
  headerTitle: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.secondary,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '75%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  theirMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
  },
  myMessageBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  theirMessageBubble: {
    backgroundColor: '#E4E6EB',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...FONTS.regular,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  theirMessageText: {
    color: COLORS.secondary,
  },
  messageTime: {
    ...FONTS.regular,
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  myTimeText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  theirTimeText: {
    color: '#65676B',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'flex-end',
    backgroundColor: COLORS.background,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    ...FONTS.regular,
    fontSize: 15,
    color: COLORS.secondary,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default ChatScreen;