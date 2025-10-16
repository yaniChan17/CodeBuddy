// src/screens/posts/CreatePostScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Button from '../../components/common/Button';
import { COLORS, FONTS } from '../../styles/globalStyles';

const PROGRAMMING_TAGS = [
  'JavaScript', 'Python', 'Java', 'React Native', 'Node.js',
  'HTML/CSS', 'SQL', 'PHP', 'C++', 'Swift', 'Kotlin',
  'Firebase', 'MongoDB', 'Git', 'APIs'
];

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [hasPhoto, setHasPhoto] = useState(false);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePhotoAttach = () => {
    setHasPhoto(!hasPhoto);
    console.log('Photo attach toggled:', !hasPhoto);
  };

  const handleSubmit = () => {
    console.log('New post:', { title, content, selectedTags, hasPhoto });
    navigation.goBack();
  };

  const isFormValid = title.trim() && content.trim() && selectedTags.length > 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ask a Question</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="What's your coding question?"
            placeholderTextColor="#B0B3B8"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
          <Text style={styles.charCount}>{title.length}/100</Text>

          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Describe your question in detail..."
            placeholderTextColor="#B0B3B8"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.label}>Tags (select up to 3) *</Text>
          <View style={styles.tagsContainer}>
            {PROGRAMMING_TAGS.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  selectedTags.includes(tag) && styles.selectedTag,
                  !selectedTags.includes(tag) && selectedTags.length >= 3 && styles.disabledTag
                ]}
                onPress={() => toggleTag(tag)}
                disabled={!selectedTags.includes(tag) && selectedTags.length >= 3}
              >
                <Text style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.selectedTagText
                ]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Attachments (optional)</Text>
          <TouchableOpacity 
            style={styles.photoButton}
            onPress={handlePhotoAttach}
          >
            <Text style={styles.photoIcon}>📷</Text>
            <View style={styles.photoButtonContent}>
              <Text style={styles.photoButtonText}>
                {hasPhoto ? 'Photo attached (placeholder)' : 'Attach Photo'}
              </Text>
              <Text style={styles.photoButtonSubtext}>
                {hasPhoto ? 'Tap to remove' : 'Full upload coming soon'}
              </Text>
            </View>
            {hasPhoto && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <View style={styles.tipContainer}>
            <Text style={styles.tipIcon}>💡</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Tips for a good question:</Text>
              <Text style={styles.tipText}>• Be specific and clear in your title</Text>
              <Text style={styles.tipText}>• Describe what you've tried</Text>
              <Text style={styles.tipText}>• Include relevant code snippets</Text>
              <Text style={styles.tipText}>• Add appropriate tags</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Post Question"
          onPress={handleSubmit}
          disabled={!isFormValid}
          style={[
            styles.submitButton,
            !isFormValid && styles.disabledButton
          ]}
        />
      </View>
    </View>
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
    alignItems: 'center',
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
  content: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  label: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 8,
    marginTop: 16,
  },
  titleInput: {
    height: 52,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.secondary,
  },
  charCount: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#65676B',
    textAlign: 'right',
    marginTop: 4,
  },
  contentInput: {
    height: 150,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.secondary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedTag: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  disabledTag: {
    opacity: 0.4,
  },
  tagText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.secondary,
  },
  selectedTagText: {
    color: '#FFFFFF',
    ...FONTS.medium,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 8,
  },
  photoIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  photoButtonContent: {
    flex: 1,
  },
  photoButtonText: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 2,
  },
  photoButtonSubtext: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#65676B',
  },
  checkmark: {
    fontSize: 24,
    color: COLORS.primary,
  },
  tipContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#FFF5F0',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    flexDirection: 'row',
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    ...FONTS.medium,
    fontSize: 15,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  tipText: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#65676B',
    marginBottom: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  submitButton: {
    height: 48,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CreatePostScreen;