import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';

type Event = {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  createdBy: string;
  attendeeCount: number;
};

export default function EventsScreen() {
  const { id } = useLocalSearchParams();
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Group Study Session',
      description: 'Preparing for calculus midterm',
      startTime: new Date(Date.now() + 86400000), // Tomorrow
      endTime: new Date(Date.now() + 86400000 + 7200000), // 2 hours later
      createdBy: 'John Doe',
      attendeeCount: 5,
    },
    {
      id: '2',
      title: 'Problem Solving Workshop',
      description: 'Practice solving complex integration problems',
      startTime: new Date(Date.now() + 172800000), // Day after tomorrow
      endTime: new Date(Date.now() + 172800000 + 7200000),
      createdBy: 'Jane Smith',
      attendeeCount: 8,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events - Group {id}</Text>
        <Link href={`/(groups)/${id}/create-event`} asChild>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create Event</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <FlatList
        data={events}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
            <View style={styles.eventTimeContainer}>
              <Text style={styles.eventTime}>
                {item.startTime.toLocaleTimeString()} - {item.endTime.toLocaleTimeString()}
              </Text>
              <Text style={styles.eventDate}>
                {item.startTime.toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.eventMeta}>
              <Text style={styles.eventHost}>Hosted by {item.createdBy}</Text>
              <Text style={styles.attendeeCount}>{item.attendeeCount} attending</Text>
            </View>
            <TouchableOpacity style={styles.rsvpButton}>
              <Text style={styles.rsvpButtonText}>RSVP</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventsList}
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
  createButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  eventsList: {
    padding: 15,
  },
  eventCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    color: '#666',
    marginBottom: 10,
  },
  eventTimeContainer: {
    marginBottom: 10,
  },
  eventTime: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  eventDate: {
    color: '#666',
    fontSize: 12,
  },
  eventMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventHost: {
    fontSize: 12,
    color: '#666',
  },
  attendeeCount: {
    fontSize: 12,
    color: '#007AFF',
  },
  rsvpButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rsvpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 