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
} from 'react-native';
import Header from '../../components/common/Header';
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
    text: 'Yes, I\'m having trouble with useEffect',
    sender: 'me',
    timestamp: '10:31 AM',
  },
  {
    id: '3',
    text: 'Here\'s a simple example that might help...',
    sender: 'them',
    timestamp: '10:32 AM',
  },
];

const Message = ({ message }) => (
  <View style={[
    styles.messageContainer,
    message.sender === 'me' ? styles.myMessage : styles.theirMessage
  ]}>
    <Text style={styles.messageText}>{message.text}</Text>
    <Text style={styles.messageTime}>{message.timestamp}</Text>
  </View>
);

const ChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState('');
  const flatListRef = useRef(null);
  const { username } = route.params;

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      // Will implement real sending later with Firebase
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <Header
        title={`@${username}`}
        leftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        }
      />

      <FlatList
        ref={flatListRef}
        data={MOCK_MESSAGES}
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          multiline
          maxHeight={100}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
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
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lightGray,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...FONTS.regular,
    fontSize: 16,
    color: props => props.sender === 'me' ? '#FFFFFF' : COLORS.secondary,
    marginBottom: 4,
  },
  messageTime: {
    ...FONTS.regular,
    fontSize: 12,
    color: props => props.sender === 'me' ? 'rgba(255,255,255,0.7)' : '#666',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingRight: 48,
    marginRight: 8,
    ...FONTS.regular,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    ...FONTS.medium,
    color: '#FFFFFF',
    fontSize: 16,
  },
  backButton: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.primary,
  },
});

export default ChatScreen;