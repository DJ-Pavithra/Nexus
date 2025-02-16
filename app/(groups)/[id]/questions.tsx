import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';

type Question = {
  id: string;
  title: string;
  content: string;
  askedBy: string;
  createdAt: Date;
  solved: boolean;
  answerCount: number;
};

export default function QuestionsScreen() {
  const { id } = useLocalSearchParams();
  const [questions] = useState<Question[]>([
    {
      id: '1',
      title: 'How to solve this integral?',
      content: 'I am stuck with this complex integration problem...',
      askedBy: 'John Doe',
      createdAt: new Date(),
      solved: true,
      answerCount: 3,
    },
    {
      id: '2',
      title: 'Derivative question',
      content: 'Need help understanding chain rule...',
      askedBy: 'Jane Smith',
      createdAt: new Date(),
      solved: false,
      answerCount: 1,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Q&A - Group {id}</Text>
        <Link href={`/(groups)/${id}/ask-question`} asChild>
          <TouchableOpacity style={styles.askButton}>
            <Text style={styles.askButtonText}>Ask Question</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <FlatList
        data={questions}
        renderItem={({ item }) => (
          <Link href={`/(groups)/${id}/questions/${item.id}`} asChild>
            <TouchableOpacity style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionTitle}>{item.title}</Text>
                {item.solved && (
                  <View style={styles.solvedBadge}>
                    <Text style={styles.solvedText}>Solved</Text>
                  </View>
                )}
              </View>
              <Text style={styles.questionContent} numberOfLines={2}>
                {item.content}
              </Text>
              <View style={styles.questionMeta}>
                <Text style={styles.askedBy}>Asked by {item.askedBy}</Text>
                <Text style={styles.answers}>{item.answerCount} answers</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.questionsList}
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
  askButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  askButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  questionsList: {
    padding: 15,
  },
  questionCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  solvedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  solvedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  questionContent: {
    color: '#666',
    marginBottom: 10,
  },
  questionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  askedBy: {
    fontSize: 12,
    color: '#666',
  },
  answers: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
  },
}); 