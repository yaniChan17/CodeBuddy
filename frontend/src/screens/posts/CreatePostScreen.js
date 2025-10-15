import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { COLORS, FONTS } from '../../styles/globalStyles';

// Predefined programming language tags
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
    } else if (selectedTags.length < 3) { // Limit to 3 tags
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePhotoAttach = () => {
    // Photo upload functionality will be implemented in the future
    setHasPhoto(!hasPhoto);
    console.log('Photo attach toggled:', !hasPhoto);
  };

  const handleSubmit = () => {
    // Will implement Firebase post creation later
    console.log('New post:', { title, content, selectedTags, hasPhoto });
    navigation.goBack();
  };

  const isFormValid = title.trim() && content.trim() && selectedTags.length > 0;

  return (
    <View style={styles.container}>
      <Header
        title="Ask a Question"
        leftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="What's your coding question?"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
          <Text style={styles.charCount}>{title.length}/100</Text>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Describe your question in detail..."
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.label}>Tags (select up to 3)</Text>
          <View style={styles.tagsContainer}>
            {PROGRAMMING_TAGS.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  selectedTags.includes(tag) && styles.selectedTag
                ]}
                onPress={() => toggleTag(tag)}
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

          <Text style={styles.label}>Attachments</Text>
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
            <Text style={styles.tipTitle}>Tips for a good question:</Text>
            <Text style={styles.tipText}>• Summarize your problem in the title</Text>
            <Text style={styles.tipText}>• Describe what you've tried</Text>
            <Text style={styles.tipText}>• Share relevant code snippets</Text>
            <Text style={styles.tipText}>• Add appropriate tags</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  charCount: {
    ...FONTS.regular,
    fontSize: 12,
    color: '#666',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
  tagText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.secondary,
  },
  selectedTagText: {
    color: '#FFFFFF',
  },
  tipContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
  },
  tipTitle: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  tipText: {
    ...FONTS.regular,
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  submitButton: {
    height: 48,
  },
  disabledButton: {
    opacity: 0.6,
  },
  backButton: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.primary,
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
    color: '#666',
  },
  checkmark: {
    fontSize: 24,
    color: COLORS.primary,
  },
});

export default CreatePostScreen;