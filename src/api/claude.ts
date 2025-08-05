import { ApiResponse, ClaudeRequest, ClaudeResponse } from './types'

export class ClaudeAPI {
  private apiKey: string
  private model: string

  constructor() {
    this.apiKey = import.meta.env.VITE_CLAUDE_API_KEY
    this.model = import.meta.env.VITE_CLAUDE_MODEL || 'claude-3-sonnet-20240229'
  }

  private validateConfig(): void {
    if (!this.apiKey || this.apiKey === 'your_claude_api_key_here') {
      alert('Clé API Claude non configurée. Veuillez configurer VITE_CLAUDE_API_KEY dans le fichier .env')
    }
  }

  async remixContent(text: string): Promise<ApiResponse> {
    this.validateConfig()
    const requestBody: ClaudeRequest = {
      model: this.model,
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `Remixe ce texte de manière professionnelle et engageante : ${text}`
        }
      ]
    }
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData: ClaudeResponse = await response.json()
        throw new Error(errorData.error?.message || 'Erreur API Claude')
      }

      const data: ClaudeResponse = await response.json()
      return { content: data.content[0].text }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
     alert('Erreur inattendue lors de la communication avec Claude')
    }
  }

  async summarizeContent(text: string): Promise<ApiResponse> {
    this.validateConfig()

    const requestBody: ClaudeRequest = {
      model: this.model,
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Crée un résumé concis et structuré de ce texte : ${text}`
        }
      ]
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData: ClaudeResponse = await response.json()
        throw new Error(errorData.error?.message || 'Erreur API Claude')
      }

      const data: ClaudeResponse = await response.json()
      return { content: data.content[0].text }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Erreur inattendue lors de la communication avec Claude')
    }
  }
} 