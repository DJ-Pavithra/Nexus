import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AIChatModal from './ai-chat-modal';

export default function GroupDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [aiChatVisible, setAiChatVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Server Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Advanced Mathematics</Text>
          <TouchableOpacity 
            style={styles.aiButton}
            onPress={() => setAiChatVisible(true)}
          >
            <Ionicons name="sparkles" size={20} color="#7C3AED" />
          </TouchableOpacity>
        </View>
        <View style={styles.memberInfo}>
          <View style={styles.memberAvatars}>
            {/* Sample member avatars */}
            <Image 
              source={{ uri: 'https://i.pravatar.cc/32?u=1' }}
              style={styles.memberAvatar}
            />
            <Image 
              source={{ uri: 'https://i.pravatar.cc/32?u=2' }}
              style={[styles.memberAvatar, styles.memberAvatarStacked]}
            />
            <Image 
              source={{ uri: 'https://i.pravatar.cc/32?u=3' }}
              style={[styles.memberAvatar, styles.memberAvatarStacked]}
            />
            <View style={[styles.memberAvatarMore, styles.memberAvatarStacked]}>
              <Text style={styles.memberAvatarMoreText}>+9</Text>
            </View>
          </View>
          <Text style={styles.memberCount}>12 members</Text>
        </View>
      </View>

      {/* Channel List */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>ABOUT</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.description}>
            University level mathematics study group focusing on calculus, linear algebra, and advanced topics.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>CHANNELS</Text>
        <View style={styles.channelList}>
          <Link href={`/(groups)/${id}/chat`} asChild>
            <TouchableOpacity style={styles.channelItem}>
              <Ionicons name="chatbubbles-outline" size={20} color="#6B7280" />
              <Text style={styles.channelName}>general</Text>
            </TouchableOpacity>
          </Link>

          <Link href={`/(groups)/${id}/resources`} asChild>
            <TouchableOpacity style={styles.channelItem}>
              <Ionicons name="document-text-outline" size={20} color="#6B7280" />
              <Text style={styles.channelName}>resources</Text>
            </TouchableOpacity>
          </Link>

          <Link href={`/(groups)/${id}/questions`} asChild>
            <TouchableOpacity style={styles.channelItem}>
              <Ionicons name="help-circle-outline" size={20} color="#6B7280" />
              <Text style={styles.channelName}>q&a</Text>
            </TouchableOpacity>
          </Link>

          <Link href={`/(groups)/${id}/events`} asChild>
            <TouchableOpacity style={styles.channelItem}>
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <Text style={styles.channelName}>events</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      <AIChatModal 
        visible={aiChatVisible}
        onClose={() => setAiChatVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  aiButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  memberAvatars: {
    flexDirection: 'row',
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  memberAvatarStacked: {
    marginLeft: -8,
  },
  memberAvatarMore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  memberAvatarMoreText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  memberCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    marginTop: 16,
  },
  aboutCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  channelList: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  channelName: {
    fontSize: 16,
    color: '#374151',
  },
}); 