import { GoogleGenerativeAI } from '@google/generative-ai'

export interface ImageAnalysisResult {
  description: string
  sentiment: 'positive' | 'negative' | 'neutral'
  tags: string[]
  moderationFlags: {
    nsfw: boolean
    violence: boolean
    spam: boolean
    inappropriate: boolean
  }
  confidence: number
}

export class GeminiClient {
  private client: GoogleGenerativeAI | null = null
  private model: any = null
  private isInitialized = false

  constructor() {
    this.initializeClient()
  }

  private initializeClient() {
    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY
      
      if (!apiKey) {
        console.error('Missing Gemini API key. Set GEMINI_API_KEY or GOOGLE_AI_API_KEY environment variable.')
        return
      }

      this.client = new GoogleGenerativeAI(apiKey)
      this.model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' })
      this.isInitialized = true
      
      console.log('Gemini client initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Gemini client:', error)
      this.isInitialized = false
    }
  }

  public isReady(): boolean {
    return this.isInitialized && this.client !== null && this.model !== null
  }

  public async analyzeImage(imageUrl: string): Promise<ImageAnalysisResult> {
    if (!this.isReady()) {
      throw new Error('Gemini client not initialized')
    }

    try {
      // Download and convert image to proper format
      const imageData = await this.fetchImageAsBase64(imageUrl)
      
      const prompt = `
        Analyze this image and provide a comprehensive assessment for Reddit content moderation:

        1. Describe what you see in the image (2-3 sentences)
        2. Determine the overall sentiment (positive, negative, or neutral)
        3. List relevant tags/categories (max 10)
        4. Check for moderation concerns:
           - NSFW content (nudity, sexual content)
           - Violence or disturbing content
           - Spam or promotional content
           - Inappropriate content for general audiences
        5. Provide a confidence score (0-100) for your analysis

        Format your response as JSON:
        {
          "description": "...",
          "sentiment": "positive|negative|neutral",
          "tags": ["tag1", "tag2", ...],
          "moderationFlags": {
            "nsfw": boolean,
            "violence": boolean,
            "spam": boolean,
            "inappropriate": boolean
          },
          "confidence": number
        }
      `

      const result = await this.model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageData,
            mimeType: 'image/jpeg'
          }
        }
      ])

      const response = await result.response
      const text = response.text()
      
      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini')
      }

      const analysisResult = JSON.parse(jsonMatch[0]) as ImageAnalysisResult
      
      // Validate the response structure
      if (!this.validateAnalysisResult(analysisResult)) {
        throw new Error('Invalid analysis result structure')
      }

      return analysisResult
    } catch (error) {
      console.error('Error analyzing image with Gemini:', error)
      throw error
    }
  }

  public async analyzeTextWithContext(text: string, context: {
    subreddit: string
    postTitle?: string
    isComment?: boolean
  }): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral'
    toxicity: number
    relevance: number
    suggestions: string[]
  }> {
    if (!this.isReady()) {
      throw new Error('Gemini client not initialized')
    }

    try {
      const prompt = `
        Analyze this ${context.isComment ? 'comment' : 'post'} from r/${context.subreddit}:
        ${context.postTitle ? `Post title: "${context.postTitle}"` : ''}
        
        Content: "${text}"
        
        Provide analysis for Reddit moderation:
        1. Sentiment (positive, negative, neutral)
        2. Toxicity score (0-100, where 100 is most toxic)
        3. Relevance to GitHub Copilot/programming (0-100)
        4. Moderation suggestions

        Response as JSON:
        {
          "sentiment": "positive|negative|neutral",
          "toxicity": number,
          "relevance": number,
          "suggestions": ["suggestion1", "suggestion2", ...]
        }
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text_response = response.text()
      
      const jsonMatch = text_response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini')
      }

      return JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error('Error analyzing text with Gemini:', error)
      throw error
    }
  }

  private async fetchImageAsBase64(imageUrl: string): Promise<string> {
    try {
      const response = await fetch(imageUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      const base64 = Buffer.from(arrayBuffer).toString('base64')
      
      return base64
    } catch (error) {
      console.error('Error fetching image:', error)
      throw error
    }
  }

  private validateAnalysisResult(result: any): result is ImageAnalysisResult {
    return (
      typeof result === 'object' &&
      typeof result.description === 'string' &&
      ['positive', 'negative', 'neutral'].includes(result.sentiment) &&
      Array.isArray(result.tags) &&
      typeof result.moderationFlags === 'object' &&
      typeof result.moderationFlags.nsfw === 'boolean' &&
      typeof result.moderationFlags.violence === 'boolean' &&
      typeof result.moderationFlags.spam === 'boolean' &&
      typeof result.moderationFlags.inappropriate === 'boolean' &&
      typeof result.confidence === 'number' &&
      result.confidence >= 0 &&
      result.confidence <= 100
    )
  }
}

// Singleton instance
export const geminiClient = new GeminiClient()