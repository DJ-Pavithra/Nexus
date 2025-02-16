import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import AIHelper from './ai-helper';

type Answer = {
  id: string;
  content: string;
  answeredBy: string;
  answeredAt: Date;
};

export default function QuestionDetailScreen() {
  const { id, questionId } = useLocalSearchParams();
  const [newAnswer, setNewAnswer] = useState('');
  const [question] = useState({
    title: 'How to solve this integral?',
    content: 'I am stuck with this complex integration problem: ∫(x²+2x+1)dx. Can someone help me understand the steps?',
    askedBy: 'John Doe',
    createdAt: new Date(),
    solved: false,
  });

  const [answers] = useState<Answer[]>([
    {
      id: '1',
      content: 'Let\'s solve this step by step...',
      answeredBy: 'Jane Smith',
      answeredAt: new Date(),
    },
  ]);

  const handleSubmitAnswer = () => {
    // TODO: Implement answer submission
    setNewAnswer('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Question {questionId} - Group {id}</Text>
        <TouchableOpacity onPress={() => router.push(`/(groups)/${id}/questions`)}>
          <Text style={styles.backButton}>Back to Questions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.questionContent}>
        <Text style={styles.questionText}>{question.content}</Text>
        <Text style={styles.askedBy}>
          Asked by {question.askedBy} on {question.createdAt.toLocaleDateString()}
        </Text>
      </View>

      <AIHelper question={question.content} />

      <View style={styles.answersSection}>
        <Text style={styles.sectionTitle}>Answers</Text>
        {answers.map((answer) => (
          <View key={answer.id} style={styles.answerCard}>
            <Text style={styles.answerContent}>{answer.content}</Text>
            <Text style={styles.answerMeta}>
              Answered by {answer.answeredBy} on {answer.answeredAt.toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.answerInput}>
        <TextInput
          style={styles.input}
          value={newAnswer}
          onChangeText={setNewAnswer}
          placeholder="Write your answer..."
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmitAnswer}
        >
          <Text style={styles.submitButtonText}>Submit Answer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  backButton: {
    color: 'white',
    fontSize: 16,
  },
  questionContent: {
    backgroundColor: 'white',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  questionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  askedBy: {
    color: '#666',
    fontSize: 12,
  },
  answersSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  answerCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  answerContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  answerMeta: {
    color: '#666',
    fontSize: 12,
  },
  answerInput: {
    padding: 15,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 