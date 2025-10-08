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
          boxShadow: "0 20px 60px rgba(79, 70, 229, 0.25)"
        }}
        className="bg-gradient-to-br from-white via-indigo-50 to-blue-50 dark:from-gray-950/95 dark:via-indigo-950/95 dark:to-slate-950/95 rounded-3xl p-10 max-w-xl w-full border-2 border-indigo-200/70 dark:border-indigo-700/40 text-indigo-900 dark:text-white backdrop-blur-xl shadow-lg"
        style={{ 
          boxShadow: "0 0 0 rgba(79, 70, 229, 0)"
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 dark:from-indigo-400 dark:via-indigo-300 dark:to-blue-400 bg-clip-text text-transparent"
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
              <span className="font-semibold text-base text-indigo-900 dark:text-indigo-300">Connected</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-indigo-950/50 dark:to-slate-950/50 backdrop-blur-md rounded-xl p-5 mb-6 border border-indigo-200/50 dark:border-indigo-700/30 shadow-sm"
            >
              {networkName && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-between items-center py-3 border-b border-indigo-200/50 dark:border-indigo-700/30"
                >
                  <span className="font-semibold text-sm text-indigo-900 dark:text-indigo-300">Network:</span>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {networkName}
                  </span>
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-between items-center py-3 border-b border-indigo-200/50 dark:border-indigo-700/30"
              >
                <span className="font-semibold text-sm text-indigo-900 dark:text-indigo-300">Address:</span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-sm font-semibold bg-indigo-100 dark:bg-indigo-900/60 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-indigo-200 dark:hover:bg-indigo-800/70 text-indigo-900 dark:text-indigo-200"
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
                  <span className="font-semibold text-sm text-indigo-900 dark:text-indigo-300">Balance:</span>
                  <span 
                    className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent"
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
              className="w-full py-4 px-8 text-lg font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-950/60 text-red-700 dark:text-red-400 border-2 border-red-300/60 dark:border-red-700/40 hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/60 dark:hover:to-red-900/70 hover:border-red-400 dark:hover:border-red-600/50 hover:shadow-md"
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
              <span className="font-semibold text-base text-indigo-900 dark:text-indigo-300">Not Connected</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center my-6 text-sm leading-relaxed text-indigo-800 dark:text-indigo-300/80 font-medium"
            >
              Connect your wallet to get started. Make sure you have MetaMask installed.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-8 text-lg font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 dark:from-indigo-800 dark:via-indigo-700 dark:to-indigo-900 text-white shadow-[0_4px_20px_rgba(79,70,229,0.4)] dark:shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:from-indigo-600 hover:via-indigo-700 hover:to-blue-700 dark:hover:from-indigo-700 dark:hover:via-indigo-600 dark:hover:to-indigo-800 hover:shadow-[0_6px_25px_rgba(79,70,229,0.5)] dark:hover:shadow-[0_6px_25px_rgba(79,70,229,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
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
          <div className="mt-6 text-center text-sm text-indigo-800 dark:text-indigo-300/70">
            <p className="m-0">
              Don't have MetaMask?{' '}
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 no-underline font-semibold transition-colors hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline"
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
