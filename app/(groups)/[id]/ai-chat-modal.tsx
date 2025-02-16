import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GEMINI_API_KEY } from '../../../lib/config';

export default function AIChatModal({ 
  visible, 
  onClose 
}: { 
  visible: boolean;
  onClose: () => void;
}) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{
              text: question
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        setAiResponse(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      setAiResponse('Sorry, I encountered an error while processing your question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuestion('');
    setAiResponse(null);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Ionicons name="logo-electron" size={24} color="#7C3AED" />
            <Text style={styles.headerTitle}>AI Assistant</Text>
          </View>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {!aiResponse && !loading && (
            <>
              <Text style={styles.subtitle}>Ask me anything about your studies</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={question}
                  onChangeText={setQuestion}
                  placeholder="Type your question here..."
                  multiline
                  numberOfLines={3}
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity 
                  style={[
                    styles.askButton,
                    !question.trim() && styles.askButtonDisabled
                  ]}
                  onPress={handleAsk}
                  disabled={!question.trim()}
                >
                  <Ionicons name="send" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </>
          )}

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#7C3AED" />
              <Text style={styles.loadingText}>Processing your question...</Text>
            </View>
          )}

          {aiResponse && (
            <View style={styles.responseContainer}>
              <View style={styles.responseHeader}>
                <Ionicons name="chatbubble-ellipses" size={20} color="#7C3AED" />
                <Text style={styles.responseTitle}>AI Response</Text>
              </View>
              <Text style={styles.responseText}>{aiResponse}</Text>
              <TouchableOpacity 
                style={styles.newQuestionButton}
                onPress={handleReset}
              >
                <Text style={styles.newQuestionButtonText}>Ask Another Question</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  askButton: {
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  askButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: '#6B7280',
  },
  responseContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  responseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 16,
  },
  newQuestionButton: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  newQuestionButtonText: {
    color: '#7C3AED',
    fontWeight: '600',
    fontSize: 14,
  },
}); 