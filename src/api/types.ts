export interface ApiResponse {
  content: string
  error?: string
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface OpenAIRequest {
  model: string
  messages: OpenAIMessage[]
  max_tokens: number
  temperature: number
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
  error?: {
    message: string
  }
}

export interface ClaudeMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ClaudeRequest {
  model: string
  max_tokens: number
  messages: ClaudeMessage[]
}

export interface ClaudeResponse {
  content: Array<{
    text: string
  }>
  error?: {
    message: string
  }
}

export type ApiProvider = 'openai' | 'claude' 