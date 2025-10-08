import { WalletConnect } from './partials/wallet-connect'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="text-center py-12 px-8 bg-white/5 border-b border-white/10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Wallet Integration Demo
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          Connect your MetaMask wallet to interact with the Ethereum blockchain
        </p>
      </header>
      
      <main className="flex-1 flex items-center justify-center px-8">
        <WalletConnect />
      </main>
      
      <footer className="text-center py-8 text-white/50 text-sm border-t border-white/10">
        <p className="m-0">Built with React + TypeScript + Vite + ethers.js + Tailwind CSS</p>
      </footer>
    </div>
  )
}

export default App
