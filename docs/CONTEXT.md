# Study Group Finder App - All-in-One Context

---

## Overview
The Study Group Finder App is a platform designed to help students and learners connect through study groups based on shared interests, educational levels, and goals. It facilitates collaboration, resource sharing, and organized study sessions, making learning more efficient and engaging.

---

## Core Features

### 1. **Authentication & Onboarding**
   - Clean **Welcome Screen** with options to **Sign Up** or **Log In**.
   - **Profile Creation**:
     - Educational level
     - Subjects of interest
     - Learning goals
     - Bio/learning style preferences

### 2. **Main Dashboard**
   - Displays the user’s profile and key features:
     - **Search Bar**: Find study groups by subject, education level, or language.
     - **Create Group Button**: Start a new study group.
     - **Recommended Groups**: Suggestions based on user preferences.

### 3. **Study Group Management**
   - **Group Creation**:
     - Customizable name and description.
     - Focus area selection (e.g., exam prep, project work).
     - Privacy settings (public/private).
   - **Group Features**:
     - Real-time chat.
     - Resource sharing hub.
     - Question & answer section.
     - Shared calendar for scheduling.

### 4. **Collaboration Tools**
   - **Chat System**:
     - Real-time messaging.
     - Multimedia support (images, videos, audio).
     - File sharing (PDFs, notes, slides).
   - **Resource Hub**:
     - Organized file storage.
     - Topic-based categorization.
     - Download for offline access.
   - **Q&A Platform**:
     - Structured question posting.
     - Threaded discussions.
     - Voting system for answers.

### 5. **Schedule Management**
   - Shared calendar for scheduling study sessions, deadlines, or exams.
   - Push notifications for reminders.
   - RSVP functionality for events.

---

## Enhanced Features
- **Gamification**: Badges, points, and leaderboards to encourage participation.
- **Video/Audio Study Sessions**: Live study sessions with screen-sharing.
- **AI-Powered Doubt Resolution**: Instant answers to common questions.
- **Multi-Language Support**: Real-time translation for multilingual groups.
- **Progress Tracking**: Track learning progress and set goals.

---

## Technical Stack

### Frontend
- **React Native** for cross-platform compatibility.
- **Expo & Expo Router** for navigation and development.
- Focus on **responsive, intuitive UI/UX**.

### Backend
- **Supabase** for database management and authentication.

### Services
- **AWS S3/Firebase Storage** for file storage.
- **Firebase Cloud Messaging (FCM)** for push notifications.
- **Deepseek** for AI-powered doubt resolution.

### Deployment
- **AWS/Google Cloud/Heroku/Netlify** for hosting.

---

## Database Schema

### Users:
```sql
users (
  id: uuid PRIMARY KEY,
  email: text UNIQUE NOT NULL,
  full_name: text,
  avatar_url: text,
  educational_level: text,
  bio: text,
  created_at: timestamp DEFAULT now(),
  last_active: timestamp,
  preferences: jsonb
)
```

### Study Groups:
```sql
study_groups (
  id: uuid PRIMARY KEY,
  name: text NOT NULL,
  description: text,
  focus_area: text,
  privacy: boolean DEFAULT false,
  created_at: timestamp DEFAULT now(),
  created_by: uuid REFERENCES users(id),
  settings: jsonb
)
```

### Group Members:
```sql

group_members (
  id: uuid PRIMARY KEY,
  group_id: uuid REFERENCES study_groups(id),
  user_id: uuid REFERENCES users(id),
  role: text DEFAULT 'member',
  joined_at: timestamp DEFAULT now(),
  UNIQUE(group_id, user_id)
)
```

### Resources:
```sql
resources (
  id: uuid PRIMARY KEY,
  group_id: uuid REFERENCES study_groups(id),
  title: text NOT NULL,
  description: text,
  file_url: text,
  file_type: text,
  uploaded_by: uuid REFERENCES users(id),
  uploaded_at: timestamp DEFAULT now(),
  category: text
)
```

### Messages:
```sql
messages (
  id: uuid PRIMARY KEY,
  group_id: uuid REFERENCES study_groups(id),
  user_id: uuid REFERENCES users(id),
  content: text,
  type: text DEFAULT 'text',
  created_at: timestamp DEFAULT now(),
  parent_id: uuid REFERENCES messages(id)
)
```

### Events:
```sql
events (
  id: uuid PRIMARY KEY,
  group_id: uuid REFERENCES study_groups(id),
  title: text NOT NULL,
  description: text,
  start_time: timestamp NOT NULL,
  end_time: timestamp,
  created_by: uuid REFERENCES users(id),
  created_at: timestamp DEFAULT now()
)
```

### Event RSVPs:
```sql
event_rsvps (
  id: uuid PRIMARY KEY,
  event_id: uuid REFERENCES events(id),
  user_id: uuid REFERENCES users(id),
  status: text,
  created_at: timestamp DEFAULT now(),
  UNIQUE(event_id, user_id)
)
```

### Questins:
```sql
questions (
  id: uuid PRIMARY KEY,
  group_id: uuid REFERENCES study_groups(id),
  title: text NOT NULL,
  content: text,
  asked_by: uuid REFERENCES users(id),
  created_at: timestamp DEFAULT now(),
  solved: boolean DEFAULT false
)
```

### Answers:
```sql
answers (
  id: uuid PRIMARY KEY,
  question_id: uuid REFERENCES questions(id),
  content: text NOT NULL,
  answered_by: uuid REFERENCES users(id),
  created_at: timestamp DEFAULT now(),
  is_accepted: boolean DEFAULT false
)
```

### Project Structure

```
study-group-finder/
├── app/ # Main application code
│   ├── layout.tsx # Root layout
│   ├── index.tsx # Entry point
│   ├── (auth)/ # Authentication routes
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (main)/ # Main app routes
│   │   ├── dashboard.tsx
│   │   ├── profile.tsx
│   │   └── settings.tsx
│   └── (groups)/ # Group-related routes
│       ├── [id]/
│       │   ├── index.tsx
│       │   ├── chat.tsx
│       │   ├── resources.tsx
│       │   ├── questions.tsx
│       │   └── events.tsx
│       ├── create.tsx
│       └── search.tsx
├── assets/ # Static assets
│   ├── images/
│   └── fonts/
├── components/ # Reusable components
│   ├── common/ # Shared components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── auth/ # Auth-related components
│   ├── groups/ # Group-related components
│   └── layout/ # Layout components
├── hooks/ # Custom hooks
│   ├── useAuth.ts
│   ├── useGroups.ts
│   └── useMessages.ts
├── lib/ # Utility functions and configs
│   ├── supabase.ts # Supabase client
│   ├── constants.ts
│   └── utils.ts
├── services/ # API and external services
│   ├── auth.ts
│   ├── groups.ts
│   └── storage.ts
├── stores/ # State management
│   ├── authStore.ts
│   └── groupStore.ts
├── types/ # TypeScript types
│   ├── database.ts
│   └── common.ts
├── styles/ # Global styles
│   └── theme.ts
├── .env # Environment variables
├── app.json # Expo config
├── package.json
└── tsconfig.json
```



