import { WalletConnect } from './partials/wallet-connect'
import { ThemeToggle } from './partials/theme-toggle'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <ThemeToggle />
      
      <header className="text-center py-12 px-8 bg-white/60 dark:bg-white/5 border-b border-purple-200/50 dark:border-white/10 backdrop-blur-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
          Wallet Integration Demo
        </h1>
        <p className="text-lg text-slate-700 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
          Connect your MetaMask wallet to interact with the Ethereum blockchain
        </p>
      </header>
      
      <main className="flex-1 flex items-center justify-center px-8">
        <WalletConnect />
      </main>
      
      <footer className="text-center py-8 text-slate-600 dark:text-white/50 text-sm border-t border-purple-200/50 dark:border-white/10">
        <p className="m-0">Built with React + TypeScript + Vite + ethers.js + Tailwind CSS</p>
      </footer>
    </div>
  )
}

export default App
