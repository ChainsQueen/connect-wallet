import { motion } from 'framer-motion';
import { useWallet } from '../core/hooks/use-wallet';

/**
 * WalletConnect Component
 * Displays wallet connection status, address, balance, and connection controls
 */
export function WalletConnect() {
  const {
    address,
    balance,
    networkName,
    isConnecting,
    error,
    isConnected,
    connectWallet,
    disconnectWallet,
    nativeTokenSymbol,
  } = useWallet();

  // Debug: Log what the component receives
  console.log(`🎨 UI Render - Network: ${networkName}, Token: ${nativeTokenSymbol}, Balance: ${balance}`);

  /**
   * Format wallet address for display (0x1234...5678)
   */
  const formatAddress = (addr: string): string => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex justify-center items-center p-8 min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          boxShadow: "0 20px 60px rgba(147, 51, 234, 0.2)"
        }}
        className="bg-gradient-to-br from-white via-purple-50/40 to-blue-50/60 dark:from-purple-900/90 dark:via-purple-800/80 dark:to-indigo-900/90 rounded-3xl p-10 max-w-xl w-full border-2 border-purple-200/60 dark:border-purple-400/30 text-slate-800 dark:text-white backdrop-blur-xl"
        style={{ 
          boxShadow: "0 0 0 rgba(147, 51, 234, 0)"
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-200 dark:via-blue-300 dark:to-cyan-300 bg-clip-text text-transparent"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Wallet Connect
        </motion.h2>
        
        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-4 mb-6 flex items-center gap-3 animate-in slide-in-from-top duration-300">
            <span className="text-2xl">⚠️</span>
            <p className="m-0 text-sm leading-relaxed">{error}</p>
          </div>
        )}

        {/* Connected State */}
        {isConnected && address ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mb-6 justify-center"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              />
              <span className="font-semibold text-base text-slate-700 dark:text-purple-100">Connected</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-800/40 dark:to-indigo-900/40 backdrop-blur-md rounded-xl p-5 mb-6 border border-purple-200/40 dark:border-purple-400/20 shadow-inner"
            >
              {networkName && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-between items-center py-3 border-b border-purple-200/40 dark:border-purple-400/20"
                >
                  <span className="font-semibold text-sm text-slate-700 dark:text-purple-200">Network:</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-cyan-300">
                    {networkName}
                  </span>
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-between items-center py-3 border-b border-purple-200/40 dark:border-purple-400/20"
              >
                <span className="font-semibold text-sm text-slate-700 dark:text-purple-200">Address:</span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-sm font-medium bg-purple-100 dark:bg-purple-700/50 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-purple-200 dark:hover:bg-purple-600/60 text-slate-800 dark:text-purple-100"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  title={address}
                >
                  {formatAddress(address)}
                </motion.span>
              </motion.div>

              {balance && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-between items-center py-3"
                >
                  <span className="font-semibold text-sm text-slate-700 dark:text-purple-200">Balance:</span>
                  <span 
                    className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-cyan-300 dark:to-blue-300 bg-clip-text text-transparent"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {balance} {nativeTokenSymbol}
                  </span>
                </motion.div>
              )}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-8 text-lg font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/40 dark:to-pink-900/40 text-red-600 dark:text-red-300 border-2 border-red-300 dark:border-red-400/40 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-800/50 dark:hover:to-pink-800/50 hover:border-red-400 dark:hover:border-red-400/60 hover:shadow-lg"
              onClick={disconnectWallet}
            >
              Disconnect Wallet
            </motion.button>
          </motion.div>
        ) : (
          /* Disconnected State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mb-6 justify-center"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              />
              <span className="font-semibold text-base text-slate-700 dark:text-purple-100">Not Connected</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center my-6 text-sm leading-relaxed text-slate-700 dark:text-purple-200/90"
            >
              Connect your wallet to get started. Make sure you have MetaMask installed.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-8 text-lg font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-500 text-white shadow-[0_4px_20px_rgba(147,51,234,0.3)] dark:shadow-[0_4px_20px_rgba(147,51,234,0.6)] hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 dark:hover:from-purple-400 dark:hover:via-blue-400 dark:hover:to-cyan-400 hover:shadow-[0_6px_25px_rgba(147,51,234,0.4)] dark:hover:shadow-[0_6px_25px_rgba(147,51,234,0.8)] disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-[18px] h-[18px] border-3 border-white/30 border-t-white rounded-full"
                  />
                  Connecting...
                </>
              ) : (
                'Connect Wallet'
              )}
            </motion.button>
          </motion.div>
        )}

        {/* MetaMask Installation Hint */}
        {!isConnected && !error && (
          <div className="mt-6 text-center text-sm text-slate-700 dark:text-purple-200/80">
            <p className="m-0">
              Don't have MetaMask?{' '}
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-cyan-300 no-underline font-semibold transition-colors hover:text-blue-700 dark:hover:text-cyan-200 hover:underline"
              >
                Install it here
              </a>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
