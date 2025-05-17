import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cgyhlofjyehlsrbntyma.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNneWhsb2ZqeWVobHNyYm50eW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3Nzk1MzAsImV4cCI6MjA2MjM1NTUzMH0.kVChViVT7U9JU9fk7815ABm0y6zp9XxolAoFYrbcAhc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 