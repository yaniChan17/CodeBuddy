// src/components/posts/ProgrammingTags.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../../styles/globalStyles';

// Popular programming tags
export const AVAILABLE_TAGS = [
  'JavaScript',
  'Python',
  'Java',
  'React Native',
  'Node.js',
  'HTML/CSS',
  'SQL',
  'PHP',
  'C++',
  'Swift',
  'Kotlin',
  'Firebase',
  'MongoDB',
  'Git',
  'APIs',
  'TypeScript',
  'React',
  'Vue.js',
  'Angular',
  'Django',
];

const ProgrammingTags = ({ 
  selectedTags = [], 
  onTagPress, 
  maxSelection = 3,
  horizontal = false 
}) => {
  const isSelected = (tag) => selectedTags.includes(tag);
  const canSelect = selectedTags.length < maxSelection;

  const handleTagPress = (tag) => {
    if (onTagPress) {
      onTagPress(tag);
    }
  };

  const TagItem = ({ tag }) => (
    <TouchableOpacity
      style={[
        styles.tag,
        isSelected(tag) && styles.selectedTag,
        !canSelect && !isSelected(tag) && styles.disabledTag,
      ]}
      onPress={() => handleTagPress(tag)}
      disabled={!canSelect && !isSelected(tag)}
    >
      <Text
        style={[
          styles.tagText,
          isSelected(tag) && styles.selectedTagText,
        ]}
      >
        {tag}
      </Text>
    </TouchableOpacity>
  );

  if (horizontal) {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalContainer}
      >
        {AVAILABLE_TAGS.map((tag) => (
          <TagItem key={tag} tag={tag} />
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {AVAILABLE_TAGS.map((tag) => (
        <TagItem key={tag} tag={tag} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  horizontalContainer: {
    paddingVertical: 8,
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
    opacity: 0.5,
  },
  tagText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.secondary,
  },
  selectedTagText: {
    color: '#FFFFFF',
  },
});

export default ProgrammingTags;