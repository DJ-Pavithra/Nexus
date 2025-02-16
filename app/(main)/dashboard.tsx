import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Study Groups</Text>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/32?u=1' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search groups..."
            placeholderTextColor="#6B7280"
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>YOUR GROUPS</Text>
        <View style={styles.groupList}>
          <Link href="/(groups)/1" asChild>
            <TouchableOpacity style={styles.groupCard}>
              <View style={styles.groupIcon}>
                <Text style={styles.groupIconText}>AM</Text>
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>Advanced Mathematics</Text>
                <Text style={styles.groupDescription}>University level mathematics study group</Text>
                <View style={styles.groupMeta}>
                  <Text style={styles.groupMembers}>12 members</Text>
                  <View style={styles.groupBadge}>
                    <Text style={styles.groupBadgeText}>Active</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
          {/* Add more group cards */}
        </View>

        <Text style={styles.sectionTitle}>RECOMMENDED</Text>
        <View style={styles.groupList}>
          {/* Similar group cards for recommendations */}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#111827',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    marginTop: 24,
  },
  groupList: {
    gap: 12,
  },
  groupCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupIconText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C3AED',
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  groupMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupMembers: {
    fontSize: 12,
    color: '#6B7280',
  },
  groupBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  groupBadgeText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 