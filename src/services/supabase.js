import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wyigkchwvcewrcxvtnio.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5aWdrY2h3dmNld3JjeHZ0bmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5MjUyMDYsImV4cCI6MjAxNDUwMTIwNn0.aYm7j1NkXv7GQUeqjnCDaGF5pB42boU6_sGsVGVzp3g";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
