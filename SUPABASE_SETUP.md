# Configuration Supabase pour la sauvegarde des tweets

## Étape 1 : Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Notez votre URL et votre clé anon (disponibles dans Settings > API)

## Étape 2 : Créer la table dans Supabase

1. Dans votre dashboard Supabase, allez dans "Table Editor"
2. Cliquez sur "New Table"
3. Créez une table avec les paramètres suivants :

**Nom de la table :** `saved_tweets`

**Colonnes :**
- `id` (type: `uuid`, Primary Key, Default: `gen_random_uuid()`)
- `content` (type: `text`, NOT NULL)
- `character_count` (type: `integer`, NOT NULL)
- `created_at` (type: `timestamptz`, Default: `now()`)

## Étape 3 : Configurer les variables d'environnement

1. Copiez le fichier `env.example` vers `.env`
2. Remplacez les valeurs par vos vraies clés Supabase :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_clé_anon
```

## Étape 4 : Tester l'application

1. Redémarrez votre serveur de développement
2. Générez des tweets
3. Cliquez sur "Sauvegarder" pour tester la fonctionnalité

## Permissions RLS (Row Level Security)

Par défaut, Supabase active RLS. Pour ce projet simple, vous pouvez désactiver RLS sur la table `saved_tweets` :

1. Allez dans "Authentication" > "Policies"
2. Trouvez votre table `saved_tweets`
3. Cliquez sur "Disable RLS" pour cette table

Cela permettra à l'application de fonctionner sans authentification utilisateur. 