# Module API

Ce répertoire contient toutes les fonctions de communication avec les API IA.

## Structure

```
src/api/
├── types.ts          # Types TypeScript pour les API
├── openai.ts         # Module pour l'API OpenAI
├── claude.ts         # Module pour l'API Claude
└── index.ts          # Exports et factory
```

## Utilisation

### Import des modules

```typescript
import { APIFactory, OpenAIAPI, ClaudeAPI } from '../api'
```

### Utilisation avec la factory

```typescript
const api = APIFactory.create('openai') // ou 'claude'
const result = await api.remixContent('Votre texte ici')
```

### Utilisation directe

```typescript
const openai = new OpenAIAPI()
const result = await openai.remixContent('Votre texte ici')
```

## Fonctionnalités disponibles

### OpenAI
- `remixContent(text: string)` - Remixe le contenu
- `summarizeContent(text: string)` - Résume le contenu

### Claude
- `remixContent(text: string)` - Remixe le contenu
- `summarizeContent(text: string)` - Résume le contenu

## Configuration

Les clés API sont configurées via les variables d'environnement :

```env
VITE_OPENAI_API_KEY=sk-your_key_here
VITE_CLAUDE_API_KEY=sk-ant-your_key_here
VITE_OPENAI_MODEL=gpt-3.5-turbo
VITE_CLAUDE_MODEL=claude-3-sonnet-20240229
```

## Gestion d'erreurs

Toutes les fonctions API incluent :
- Validation des clés API
- Gestion des erreurs réseau
- Messages d'erreur explicites
- Types TypeScript stricts 