export interface Database {
  // Basic types for our tables
  books: {
    id: string;
    title: string;
    author: string | null;
    cover_url: string | null;
    file_url: string;
    file_type: string;
    created_at: string;
    updated_at: string;
    user_id: string;
  };
  reading_progress: {
    id: string;
    book_id: string;
    user_id: string;
    current_location: string;
    progress: number;
    last_read: string;
  };
  user_preferences: {
    id: string;
    user_id: string;
    theme: string;
    font_size: number;
    font_family: string;
  };
}
