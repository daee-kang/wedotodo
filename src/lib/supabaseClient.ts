import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/supabase';

export const supabase = createClient<Database>(
	'https://ujglvvvcvsszinwmcgmf.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqZ2x2dnZjdnNzemlud21jZ21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxNTc5NjQsImV4cCI6MjAwMjczMzk2NH0.HeaUqURcLuUvx8Es9RD0v3tBZ_MU-xdewyqJqa-0t7g'
);
