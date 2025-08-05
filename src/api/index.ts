import { OpenAIAPI } from './openai'
import { ClaudeAPI } from './claude'

export type { ApiResponse, ApiProvider } from './types'

// Factory pour créer l'instance API appropriée
export class APIFactory {
  static create(provider: 'openai' | 'claude') {
    switch (provider) {
      case 'openai':
        return new OpenAIAPI()
      case 'claude':
        return new ClaudeAPI()
      default:
        throw new Error(`Fournisseur API non supporté: ${provider}`)
    }
  }
} 