-- Créer la table saved_tweets
CREATE TABLE IF NOT EXISTS saved_tweets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    character_count INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Désactiver RLS pour cette table (optionnel, pour simplifier)
ALTER TABLE saved_tweets DISABLE ROW LEVEL SECURITY;

-- Créer un index sur created_at pour optimiser les requêtes de tri
CREATE INDEX IF NOT EXISTS idx_saved_tweets_created_at ON saved_tweets(created_at DESC);

-- Insérer quelques tweets de test (optionnel)
INSERT INTO saved_tweets (content, character_count) VALUES
('Voici un tweet de test pour vérifier que tout fonctionne ! #test #supabase', 85),
('Deuxième tweet de test avec des emojis 🚀✨ #test #demo', 65); 