import { ClaudeAPI } from './claude'

export type { ApiResponse, ApiProvider } from './types'

// Factory pour créer l'instance API Claude
export class APIFactory {
  static create() {
    return new ClaudeAPI()
  }
} 