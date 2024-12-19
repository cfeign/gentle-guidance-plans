import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ttuxhuvxdascfuiiuewz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dXhodXZ4ZGFzY2Z1aWl1ZXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MDY5NDQsImV4cCI6MjA0OTM4Mjk0NH0.LeBUqx2UwAZyNrBXZKJ_OweayrnjTh1oitSpsqoay8A";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  }
);

// Add error logging
supabase.from('treatment_suggestions').select('*').then(
  (response) => {
    if (response.error) {
      console.error('Supabase connection test failed:', response.error);
    } else {
      console.log('Supabase connection test successful');
    }
  }
);