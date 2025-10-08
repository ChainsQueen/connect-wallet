import { motion } from 'framer-motion'
import { WalletConnect } from './partials/wallet-connect'
import { ThemeToggle } from './partials/theme-toggle'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-indigo-100 to-blue-100 dark:from-gray-950 dark:via-indigo-950 dark:to-slate-950">
      <ThemeToggle />
      
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 px-8 bg-white/70 dark:bg-indigo-950/40 border-b border-indigo-200/60 dark:border-indigo-800/40 backdrop-blur-md shadow-sm"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 dark:from-indigo-400 dark:via-indigo-300 dark:to-blue-400 bg-clip-text text-transparent cursor-default"
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
          className="text-lg text-indigo-900 dark:text-indigo-300/80 max-w-2xl mx-auto leading-relaxed cursor-default font-medium"
        >
          Connect your MetaMask wallet to interact with the Ethereum blockchain
        </motion.p>
      </motion.header>
      
      <main className="flex-1 flex items-center justify-center px-8">
        <WalletConnect />
      </main>
      
      <footer className="text-center py-8 text-indigo-700 dark:text-indigo-400/60 text-sm border-t border-indigo-200/60 dark:border-indigo-800/40">
        <p className="m-0">Built with React + TypeScript + Vite + ethers.js + Tailwind CSS</p>
      </footer>
    </div>
  )
}

export default App
