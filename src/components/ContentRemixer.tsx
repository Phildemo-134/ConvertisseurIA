import React, { useState } from 'react'
import { APIFactory } from '../api'
import { TweetsResponse } from '../api/types'
import Notification from './Notification'

const ContentRemixer: React.FC = () => {
  const [inputText, setInputText] = useState<string>('')
  const [tweets, setTweets] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error' | 'info'
    isVisible: boolean
  }>({
    message: '',
    type: 'info',
    isVisible: false
  })

  const handleRemix = async () => {
    if (!inputText.trim()) {
      setError('Veuillez entrer du texte à remixer')
      return
    }
    setIsLoading(true)
    setError('')

    try {
      const api = APIFactory.create()
      const result = await api.generateTweetsFromBlogPost(inputText)
      setTweets(result.tweets)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du remixage. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setInputText('')
    setTweets([])
    setError('')
  }



  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }))
  }

  return (
    <>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section d'entrée */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 card-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg animate-float">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Texte à remixer
                  </h2>
                  <p className="text-slate-500 text-sm">Entrez votre contenu original</p>
                </div>
              </div>
              
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Entrez votre texte ici... Votre contenu sera transformé par l'IA Claude pour créer une version améliorée."
                  className="w-full h-80 p-6 border-2 border-slate-200 rounded-xl resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm text-slate-700 placeholder-slate-400 focus-ring"
                  disabled={isLoading}
                />
                <div className="absolute bottom-4 right-4 text-xs text-slate-400">
                  {inputText.length} caractères
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleRemix}
                  disabled={isLoading || !inputText.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-300 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:transform-none btn-modern"
                >
                  {isLoading ? (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                      Remixage en cours...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Remixer avec Claude
                    </>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  disabled={isLoading}
                  className="px-8 py-4 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium focus-ring"
                >
                  Effacer
                </button>
              </div>
            </div>
          </div>

          {/* Section de sortie */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 card-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg animate-float">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Tweets générés
                  </h2>
                  <p className="text-slate-500 text-sm">5 tweets créés à partir de votre contenu</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="min-h-80 p-6 border-2 border-slate-200 rounded-xl bg-gradient-to-br from-slate-50 to-white/50 backdrop-blur-sm">
                  {error && (
                    <div className="text-red-600 bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center gap-3 animate-pulse-glow">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  )}
                  {tweets.length > 0 ? (
                    <div className="space-y-4">
                      {tweets.map((tweet, index) => (
                        <div key={index} className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-slate-800 leading-relaxed">{tweet}</p>
                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                                <span className="text-xs text-slate-500">{tweet.length}/200 caractères</span>
                                <button
                                  onClick={() => {
                                    const encodedTweet = encodeURIComponent(tweet)
                                    window.open(`https://twitter.com/intent/tweet?text=${encodedTweet}`, '_blank')
                                  }}
                                  className="flex items-center gap-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                                >
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                  </svg>
                                  Publier
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-slate-400 italic text-center py-20">
                      <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-lg">Vos tweets apparaîtront ici...</p>
                      <p className="text-sm mt-2">Cliquez sur "Remixer avec Claude" pour commencer</p>
                    </div>
                  )}
                </div>
              </div>
              

            </div>
          </div>
        </div>
      </div>
      
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
        duration={3000}
      />
    </>
  )
}

export default ContentRemixer 