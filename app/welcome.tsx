import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Theme object with fixed color definitions
export const theme = {
  colors: {
    gradient: {
      background: ["#121212", "#1E1E1E"],
      primary: ["#4A90E2", "#6A5ACD"],
    },
    accent: {
      primary: "#4A90E2",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
    background: {
      secondary: "#1E1E1E",
    },
  },
};

export default function Welcome() {
  return (
    <LinearGradient 
      colors={theme.colors.gradient.background}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <LinearGradient
            colors={theme.colors.gradient.primary as [string, string]}
            style={styles.iconContainer}
          >
            <Ionicons name="school" size={40} color="white" />
          </LinearGradient>
          <Text style={styles.title}>Study Group Finder</Text>
          <Text style={styles.subtitle}>Connect. Learn. Succeed.</Text>
        </View>

        <View style={styles.features}>
          <FeatureItem icon="people" text="Join study groups with like-minded students" />
          <FeatureItem icon="book" text="Access shared resources and materials" />
          <FeatureItem icon="bulb" text="Get AI-powered learning assistance" />
        </View>

        <View style={styles.buttonContainer}>
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <LinearGradient
                colors={theme.colors.gradient.primary as [string, string]}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>
          
          <Link href="/register" asChild>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}

function FeatureItem({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={24} color={theme.colors.accent.primary} />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: theme.colors.accent.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  features: {
    gap: 20,
    marginVertical: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 40,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: theme.colors.accent.primary,
  },
  secondaryButtonText: {
    color: theme.colors.accent.primary,
    fontSize: 18,
    fontWeight: '600',
  },
});

