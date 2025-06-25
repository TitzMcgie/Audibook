-- Create books table
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT,
  cover_url TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create reading progress table
CREATE TABLE reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  current_location TEXT NOT NULL,
  progress FLOAT NOT NULL DEFAULT 0,
  last_read TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(book_id, user_id)
);

-- Create user preferences table
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'light',
  font_size INT DEFAULT 16,
  font_family TEXT DEFAULT 'serif',
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Books RLS Policies
CREATE POLICY "Users can manage their own books" 
ON books FOR ALL USING (auth.uid() = user_id);

-- Reading Progress RLS Policies
CREATE POLICY "Users can manage their reading progress"
ON reading_progress FOR ALL USING (auth.uid() = user_id);

-- User Preferences RLS Policies
CREATE POLICY "Users can manage their preferences"
ON user_preferences FOR ALL USING (auth.uid() = user_id);
