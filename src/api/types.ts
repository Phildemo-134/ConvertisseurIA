export interface ApiResponse {
  content: string
  error?: string
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

export type ApiProvider = 'claude' 