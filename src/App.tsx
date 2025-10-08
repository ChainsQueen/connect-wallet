import { motion } from 'framer-motion'
import { WalletConnect } from './partials/wallet-connect'
import { ThemeToggle } from './partials/theme-toggle'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-950 dark:to-slate-900">
      <ThemeToggle />
      
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 px-8 bg-white/60 dark:bg-purple-900/20 border-b border-purple-200/50 dark:border-purple-500/20 backdrop-blur-sm"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-300 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent cursor-default"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Wallet Integration Demo
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ 
            scale: 1.02,
            y: -2,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          className="text-lg text-slate-700 dark:text-purple-200/80 max-w-2xl mx-auto leading-relaxed cursor-default"
        >
          Connect your MetaMask wallet to interact with the Ethereum blockchain
        </motion.p>
      </motion.header>
      
      <main className="flex-1 flex items-center justify-center px-8">
        <WalletConnect />
      </main>
      
      <footer className="text-center py-8 text-slate-600 dark:text-purple-300/60 text-sm border-t border-purple-200/50 dark:border-purple-500/20">
        <p className="m-0">Built with React + TypeScript + Vite + ethers.js + Tailwind CSS</p>
      </footer>
    </div>
  )
}

export default App
