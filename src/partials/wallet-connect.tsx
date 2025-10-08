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
      <div className="bg-gradient-to-br from-white via-purple-50/40 to-blue-50/60 dark:from-purple-900/90 dark:via-purple-800/80 dark:to-indigo-900/90 rounded-3xl p-10 max-w-xl w-full border-2 border-purple-200/60 dark:border-purple-400/30 text-slate-800 dark:text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(147,51,234,0.2)] dark:hover:shadow-[0_20px_60px_rgba(147,51,234,0.6)]">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-200 dark:via-blue-300 dark:to-cyan-300 bg-clip-text text-transparent">
          Wallet Connect
        </h2>
        
        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-4 mb-6 flex items-center gap-3 animate-in slide-in-from-top duration-300">
            <span className="text-2xl">⚠️</span>
            <p className="m-0 text-sm leading-relaxed">{error}</p>
          </div>
        )}

        {/* Connected State */}
        {isConnected && address ? (
          <div>
            <div className="flex items-center gap-2 mb-6 justify-center">
              <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse-slow"></span>
              <span className="font-semibold text-base text-slate-700 dark:text-purple-100">Connected</span>
            </div>

            <div className="bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-800/40 dark:to-indigo-900/40 backdrop-blur-md rounded-xl p-5 mb-6 border border-purple-200/40 dark:border-purple-400/20 shadow-inner">
              {networkName && (
                <div className="flex justify-between items-center py-3 border-b border-purple-200/40 dark:border-purple-400/20">
                  <span className="font-semibold text-sm text-slate-700 dark:text-purple-200">Network:</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-cyan-300">
                    {networkName}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-3 border-b border-purple-200/40 dark:border-purple-400/20">
                <span className="font-semibold text-sm text-slate-700 dark:text-purple-200">Address:</span>
                <span 
                  className="font-mono text-sm font-medium bg-purple-100 dark:bg-purple-700/50 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-purple-200 dark:hover:bg-purple-600/60 text-slate-800 dark:text-purple-100"
                  title={address}
                >
                  {formatAddress(address)}
                </span>
              </div>

              {balance && (
                <div className="flex justify-between items-center py-3">
                  <span className="font-semibold text-sm text-slate-700 dark:text-purple-200">Balance:</span>
                  <span className="font-mono text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
                    {balance} {nativeTokenSymbol}
                  </span>
                </div>
              )}
            </div>

            <button
              className="w-full py-4 px-8 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/40 dark:to-pink-900/40 text-red-600 dark:text-red-300 border-2 border-red-300 dark:border-red-400/40 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-800/50 dark:hover:to-pink-800/50 hover:border-red-400 dark:hover:border-red-400/60 hover:-translate-y-0.5 hover:shadow-lg"
              onClick={disconnectWallet}
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          /* Disconnected State */
          <div>
            <div className="flex items-center gap-2 mb-6 justify-center">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse-slow"></span>
              <span className="font-semibold text-base text-slate-700 dark:text-purple-100">Not Connected</span>
            </div>

            <p className="text-center my-6 text-sm leading-relaxed text-slate-700 dark:text-purple-200/90">
              Connect your wallet to get started. Make sure you have MetaMask installed.
            </p>

            <button
              className="w-full py-4 px-8 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-500 text-white shadow-[0_4px_20px_rgba(147,51,234,0.3)] dark:shadow-[0_4px_20px_rgba(147,51,234,0.6)] hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 dark:hover:from-purple-400 dark:hover:via-blue-400 dark:hover:to-cyan-400 hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(147,51,234,0.4)] dark:hover:shadow-[0_6px_25px_rgba(147,51,234,0.8)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <span className="w-[18px] h-[18px] border-3 border-white/30 border-t-white rounded-full animate-spin-slow"></span>
                  Connecting...
                </>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>
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
      </div>
    </div>
  );
}
