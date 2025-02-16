import { Stack } from 'expo-router';
import { ThemeProvider } from '../components/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen 
          name="welcome" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="(auth)/login" 
          options={{ 
            title: 'Login',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="(auth)/register" 
          options={{ 
            title: 'Sign Up',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="(main)" 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}