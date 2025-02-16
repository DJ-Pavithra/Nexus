import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';

type Resource = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  uploadedBy: string;
  uploadedAt: Date;
  category: string;
};

export default function ResourcesScreen() {
  const { id } = useLocalSearchParams();
  const [resources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Calculus Notes - Week 1',
      description: 'Introduction to limits and derivatives',
      fileUrl: 'https://example.com/file1.pdf',
      fileType: 'pdf',
      uploadedBy: 'John Doe',
      uploadedAt: new Date(),
      category: 'Notes',
    },
    {
      id: '2',
      title: 'Practice Problems',
      description: 'Exercise set for integration',
      fileUrl: 'https://example.com/file2.pdf',
      fileType: 'pdf',
      uploadedBy: 'Jane Smith',
      uploadedAt: new Date(),
      category: 'Exercises',
    },
  ]);

  const renderResourceItem = ({ item }: { item: Resource }) => (
    <TouchableOpacity style={styles.resourceCard}>
      <View style={styles.resourceHeader}>
        <Text style={styles.resourceTitle}>{item.title}</Text>
        <Text style={styles.resourceType}>{item.fileType.toUpperCase()}</Text>
      </View>
      <Text style={styles.resourceDescription}>{item.description}</Text>
      <View style={styles.resourceMeta}>
        <Text style={styles.resourceCategory}>{item.category}</Text>
        <Text style={styles.resourceUploader}>
          Uploaded by {item.uploadedBy} • {item.uploadedAt.toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resources - Group {id}</Text>
        <Link href={`/(groups)/${id}/upload-resource`} asChild>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload New</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.categories}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.categoryChip, styles.categoryChipActive]}>
            <Text style={styles.categoryChipTextActive}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>Exercises</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>Slides</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={resources}
        renderItem={renderResourceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resourceList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  uploadButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  uploadButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  categories: {
    padding: 15,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryChipText: {
    color: '#666',
  },
  categoryChipTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  resourceList: {
    padding: 15,
  },
  resourceCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  resourceType: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  resourceDescription: {
    color: '#666',
    marginBottom: 10,
  },
  resourceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resourceCategory: {
    fontSize: 12,
    color: '#007AFF',
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  resourceUploader: {
    fontSize: 12,
    color: '#666',
  },
}); 