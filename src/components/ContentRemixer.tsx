import React, { useState } from 'react'
import { APIFactory } from '../api'

const ContentRemixer: React.FC = () => {
  const [inputText, setInputText] = useState<string>('')
  const [outputText, setOutputText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [selectedApi, setSelectedApi] = useState<'openai' | 'claude'>('openai')

  const handleRemix = async () => {
    if (!inputText.trim()) {
      setError('Veuillez entrer du texte à remixer')
      return
    }
    setIsLoading(true)
    setError('')

    try {
      const api = APIFactory.create(selectedApi)
      const result = await api.remixContent(inputText)
      setOutputText(result.content)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du remixage. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }



  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setError('')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      // Optionnel : afficher une notification de succès
    } catch (err) {
      setError('Erreur lors de la copie')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section Sélection API */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Sélection de l'API IA
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Choisissez votre API IA
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="api"
                  value="openai"
                  checked={selectedApi === 'openai'}
                  onChange={(e) => setSelectedApi(e.target.value as 'openai' | 'claude')}
                  className="mr-2"
                />
                <span className="text-sm text-slate-700">OpenAI (GPT-3.5)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="api"
                  value="claude"
                  checked={selectedApi === 'claude'}
                  onChange={(e) => setSelectedApi(e.target.value as 'openai' | 'claude')}
                  className="mr-2"
                />
                <span className="text-sm text-slate-700">Claude (Anthropic)</span>
              </label>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Configurez vos clés API dans le fichier .env à la racine du projet.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section d'entrée */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Texte à remixer
            </h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Entrez votre texte ici..."
              className="w-full h-64 p-4 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <div className="flex gap-3 mt-4">
                <button
                  onClick={handleRemix}
                  disabled={isLoading || !inputText.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                {isLoading ? (
                  <>
                    <div className="flex items-center -ml-1 mr-1">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                    Remixage en cours...
                  </>
                ) : (
                  'Remixer avec l\'IA'
                )}
              </button>
              <button
                onClick={handleClear}
                disabled={isLoading}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
              >
                Effacer
              </button>
            </div>
          </div>
        </div>

        {/* Section de sortie */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Résultat
            </h2>
            <div className="min-h-64 p-4 border border-slate-300 rounded-lg bg-slate-50">
              {error && (
                <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  {error}
                </div>
              )}
              {outputText ? (
                <div className="whitespace-pre-wrap text-slate-800">
                  {outputText}
                </div>
              ) : (
                <div className="text-slate-500 italic">
                  Le contenu remixé apparaîtra ici...
                </div>
              )}
            </div>
            {outputText && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCopy}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Copier le résultat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentRemixer 