// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ttuxhuvxdascfuiiuewz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dXhodXZ4ZGFzY2Z1aWl1ZXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MDY5NDQsImV4cCI6MjA0OTM4Mjk0NH0.LeBUqx2UwAZyNrBXZKJ_OweayrnjTh1oitSpsqoay8A";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);