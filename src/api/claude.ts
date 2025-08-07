import Anthropic from "@anthropic-ai/sdk";
import { ApiResponse, TweetsResponse } from './types'
import { TWEET_GENERATION_PROMPT, SUMMARIZATION_PROMPT } from './prompts'

export class ClaudeAPI {
  private anthropic: Anthropic
  private model: string

  constructor() {
    const apiKey = import.meta.env.VITE_CLAUDE_API_KEY
    if (!apiKey || apiKey === 'your_claude_api_key_here') {
      alert('Clé API Claude non configurée. Veuillez configurer VITE_CLAUDE_API_KEY dans le fichier .env')
    }
    
    this.anthropic = new Anthropic({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    })
    this.model = import.meta.env.VITE_CLAUDE_MODEL || 'claude-sonnet-4-20250514'
  }


    async generateTweetsFromBlogPost(text: string): Promise<TweetsResponse> {
    try {
      const msg = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 1000,
        temperature: 0.7,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `${TWEET_GENERATION_PROMPT}: ${text}`
              }
            ]
          }
        ]
      })

      // Accéder au contenu textuel de manière sûre
      const textContent = msg.content.find(block => block.type === 'text')
      if (!textContent || textContent.type !== 'text') {
        throw new Error('Aucune réponse textuelle reçue de Claude')
      }

      // Parser la réponse JSON
      try {
        const parsedResponse = JSON.parse(textContent.text)
        if (parsedResponse.tweets && Array.isArray(parsedResponse.tweets)) {
          return { tweets: parsedResponse.tweets }
        } else {
          throw new Error('Format de réponse invalide')
        }
      } catch (parseError) {
        // Si le parsing JSON échoue, on retourne une erreur
        throw new Error('Réponse de Claude non parsable en JSON')
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Erreur inattendue lors de la communication avec Claude')
    }
  }

  async summarizeContent(text: string): Promise<ApiResponse> {
    try {
      const msg = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 500,
        temperature: 0.3,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `${SUMMARIZATION_PROMPT} ${text}`
              }
            ]
          }
        ]
      })

      // Accéder au contenu textuel de manière sûre
      const textContent = msg.content.find(block => block.type === 'text')
      if (!textContent || textContent.type !== 'text') {
        throw new Error('Aucune réponse textuelle reçue de Claude')
      }

      return { content: textContent.text }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Erreur inattendue lors de la communication avec Claude')
    }
  }
} 