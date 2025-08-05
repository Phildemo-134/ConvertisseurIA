import ContentRemixer from './components/ContentRemixer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Convertisseur IA
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transformez votre contenu avec l'intelligence artificielle. 
            Remixez, reformulez et améliorez vos textes en quelques clics.
          </p>
        </header>
        <ContentRemixer />
      </div>
    </div>
  )
}

export default App
