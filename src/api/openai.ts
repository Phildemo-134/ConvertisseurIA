import { ApiResponse, OpenAIRequest, OpenAIResponse } from './types'

export class OpenAIAPI {
  private apiKey: string
  private model: string

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY
    this.model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo'
  }

  private validateConfig(): void {
    if (!this.apiKey || this.apiKey === 'your_openai_api_key_here') {
      throw new Error('Clé API OpenAI non configurée. Veuillez configurer VITE_OPENAI_API_KEY dans le fichier .env')
    }
  }

  async remixContent(text: string): Promise<ApiResponse> {
    this.validateConfig()
    const requestBody: OpenAIRequest = {
      model: this.model,
      messages: [
        {
          role: 'system',
          content: 'Tu es un assistant qui aide à remixer et améliorer du contenu. Reformule le texte de manière professionnelle et engageante.'
        },
        {
          role: 'user',
          content: `Remixe ce texte : ${text}`
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    }
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData: OpenAIResponse = await response.json()
        throw new Error(errorData.error?.message || 'Erreur API OpenAI')
      }

      const data: OpenAIResponse = await response.json()
      return { content: data.choices[0].message.content }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Erreur inattendue lors de la communication avec OpenAI')
    }
  }

  async summarizeContent(text: string): Promise<ApiResponse> {
    this.validateConfig()

    const requestBody: OpenAIRequest = {
      model: this.model,
      messages: [
        {
          role: 'system',
          content: 'Tu es un assistant qui aide à résumer du contenu. Crée un résumé concis et structuré du texte fourni.'
        },
        {
          role: 'user',
          content: `Résume ce texte : ${text}`
        }
      ],
      max_tokens: 500,
      temperature: 0.5
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData: OpenAIResponse = await response.json()
        throw new Error(errorData.error?.message || 'Erreur API OpenAI')
      }

      const data: OpenAIResponse = await response.json()
      return { content: data.choices[0].message.content }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Erreur inattendue lors de la communication avec OpenAI')
    }
  }
} 