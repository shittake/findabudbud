import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://oxusohfvchyhbgxecjsi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94dXNvaGZ2Y2h5aGJneGVjanNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI4ODAyNjksImV4cCI6MTk2ODQ1NjI2OX0.h_b93rMzs-do5GBj8jAlILqYiq7Tg70SRfXzv0JsiFA"
);
