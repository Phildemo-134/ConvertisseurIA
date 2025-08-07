import Anthropic from "@anthropic-ai/sdk";
import { ApiResponse } from './types'

const prompt = `Tu es un expert en social media et ghostwriter. Tu travailles pour un blogueur célèbre. Ton travail consiste à prendre une publication
de son blog et d'en faire plusieurs tweets pour partager les différentes idées de la publication. On te 
donne une publication et tu dois créer 5 tweets à partir de cet article.
Comme tu es ghostwriter tu dois préserver le ton et le style de la publication le plus possible.
Rappelle toi qu'un tweet ne peut exceder 200 caractères.
Retourne les tweets sous la forme d'une liste, chaque tweet étant sur une ligne.
N'inclus pas de hastag ni d'emoji.
Inclus au moins 5 tweets. 
La publication est la suivante :`;

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


    async generateTweetsFromBlogPost(text: string): Promise<ApiResponse> {
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
                text: `${prompt}: ${text}`
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
                text: `Crée un résumé concis et structuré de ce texte : ${text}`
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