import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { GEMINI_API_KEY } from '../../../../lib/config';

export default function AIHelper({ question }: { question: string }) {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const getAIHelp = async () => {
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
              text: `As a helpful academic tutor, please provide a clear, step-by-step explanation for this question: ${question}`
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
      console.error('AI Helper Error:', error);
      setAiResponse('Sorry, I encountered an error while processing your question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      {!aiResponse && !loading && (
        <TouchableOpacity 
          style={styles.askButton}
          onPress={getAIHelp}
        >
          <Text style={styles.askButtonText}>Get AI Help</Text>
        </TouchableOpacity>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>AI is thinking...</Text>
        </View>
      )}

      {aiResponse && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>{aiResponse}</Text>
          <TouchableOpacity 
            style={styles.tryAgainButton}
            onPress={getAIHelp}
          >
            <Text style={styles.tryAgainButtonText}>Ask Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  askButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  askButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  responseContainer: {
    gap: 15,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  tryAgainButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tryAgainButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
}); 