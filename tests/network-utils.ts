/**
 * Network Testing Utility
 * 
 * This file provides utilities to test network detection and validation
 * Run in browser console to verify all networks are properly configured
 */

interface NetworkTest {
  chainId: number;
  expectedName: string;
  expectedSymbol: string;
  category: 'mainnet' | 'testnet' | 'development';
}

export const NETWORK_TESTS: NetworkTest[] = [
  // Ethereum
  { chainId: 1, expectedName: 'Ethereum Mainnet', expectedSymbol: 'ETH', category: 'mainnet' },
  { chainId: 5, expectedName: 'Goerli Testnet', expectedSymbol: 'ETH', category: 'testnet' },
  { chainId: 11155111, expectedName: 'Sepolia Testnet', expectedSymbol: 'ETH', category: 'testnet' },
  { chainId: 17000, expectedName: 'Holesky Testnet', expectedSymbol: 'ETH', category: 'testnet' },
  
  // Polygon
  { chainId: 137, expectedName: 'Polygon Mainnet', expectedSymbol: 'MATIC', category: 'mainnet' },
  { chainId: 80001, expectedName: 'Mumbai Testnet', expectedSymbol: 'MATIC', category: 'testnet' },
  { chainId: 80002, expectedName: 'Amoy Testnet', expectedSymbol: 'MATIC', category: 'testnet' },
  
  // BSC
  { chainId: 56, expectedName: 'BSC Mainnet', expectedSymbol: 'BNB', category: 'mainnet' },
  { chainId: 97, expectedName: 'BSC Testnet', expectedSymbol: 'BNB', category: 'testnet' },
  
  // Arbitrum
  { chainId: 42161, expectedName: 'Arbitrum One', expectedSymbol: 'ETH', category: 'mainnet' },
  { chainId: 42170, expectedName: 'Arbitrum Nova', expectedSymbol: 'ETH', category: 'mainnet' },
  { chainId: 421613, expectedName: 'Arbitrum Goerli', expectedSymbol: 'ETH', category: 'testnet' },
  { chainId: 421614, expectedName: 'Arbitrum Sepolia', expectedSymbol: 'ETH', category: 'testnet' },
  
  // Optimism
  { chainId: 10, expectedName: 'Optimism', expectedSymbol: 'ETH', category: 'mainnet' },
  { chainId: 420, expectedName: 'Optimism Goerli', expectedSymbol: 'ETH', category: 'testnet' },
  { chainId: 11155420, expectedName: 'Optimism Sepolia', expectedSymbol: 'ETH', category: 'testnet' },
  
  // Base
  { chainId: 8453, expectedName: 'Base', expectedSymbol: 'ETH', category: 'mainnet' },
  { chainId: 84531, expectedName: 'Base Goerli', expectedSymbol: 'ETH', category: 'testnet' },
  { chainId: 84532, expectedName: 'Base Sepolia', expectedSymbol: 'ETH', category: 'testnet' },
  
  // Avalanche
  { chainId: 43114, expectedName: 'Avalanche C-Chain', expectedSymbol: 'AVAX', category: 'mainnet' },
  { chainId: 43113, expectedName: 'Avalanche Fuji', expectedSymbol: 'AVAX', category: 'testnet' },
  
  // Fantom
  { chainId: 250, expectedName: 'Fantom Opera', expectedSymbol: 'FTM', category: 'mainnet' },
  { chainId: 4002, expectedName: 'Fantom Testnet', expectedSymbol: 'FTM', category: 'testnet' },
  
  // zkSync
  { chainId: 324, expectedName: 'zkSync Era', expectedSymbol: 'ETH', category: 'mainnet' },
  { chainId: 280, expectedName: 'zkSync Era Testnet', expectedSymbol: 'ETH', category: 'testnet' },
  
  // Linea
  { chainId: 59144, expectedName: 'Linea', expectedSymbol: 'ETH', category: 'mainnet' },
  { chainId: 59140, expectedName: 'Linea Testnet', expectedSymbol: 'ETH', category: 'testnet' },
  
  // Scroll
  { chainId: 534352, expectedName: 'Scroll', expectedSymbol: 'ETH', category: 'mainnet' },
  { chainId: 534351, expectedName: 'Scroll Sepolia', expectedSymbol: 'ETH', category: 'testnet' },
  
  // Mantle
  { chainId: 5000, expectedName: 'Mantle', expectedSymbol: 'MNT', category: 'mainnet' },
  { chainId: 5001, expectedName: 'Mantle Testnet', expectedSymbol: 'MNT', category: 'testnet' },
  
  // Celo
  { chainId: 42220, expectedName: 'Celo', expectedSymbol: 'CELO', category: 'mainnet' },
  { chainId: 44787, expectedName: 'Celo Alfajores', expectedSymbol: 'CELO', category: 'testnet' },
  
  // Gnosis
  { chainId: 100, expectedName: 'Gnosis Chain', expectedSymbol: 'xDAI', category: 'mainnet' },
  { chainId: 10200, expectedName: 'Gnosis Chiado', expectedSymbol: 'xDAI', category: 'testnet' },
  
  // Moonbeam
  { chainId: 1284, expectedName: 'Moonbeam', expectedSymbol: 'GLMR', category: 'mainnet' },
  { chainId: 1287, expectedName: 'Moonbase Alpha', expectedSymbol: 'DEV', category: 'testnet' },
  
  // Development
  { chainId: 1337, expectedName: 'Localhost', expectedSymbol: 'ETH', category: 'development' },
  { chainId: 31337, expectedName: 'Hardhat Network', expectedSymbol: 'ETH', category: 'development' },
  
  // Intuition
  { chainId: 13579, expectedName: 'Intuition Testnet', expectedSymbol: 'TRUST', category: 'testnet' },
  
  // Sei
  { chainId: 1329, expectedName: 'Sei Mainnet', expectedSymbol: 'SEI', category: 'mainnet' },
  { chainId: 713715, expectedName: 'Sei Testnet', expectedSymbol: 'SEI', category: 'testnet' },
];

/**
 * Test network name resolution
 * Copy the getNetworkName function from use-wallet.ts to test
 */
export function testNetworkNames(getNetworkName: (chainId: number) => string): void {
  console.log('🧪 Testing Network Name Resolution...\n');
  
  let passed = 0;
  let failed = 0;
  const failures: string[] = [];
  
  NETWORK_TESTS.forEach(test => {
    const result = getNetworkName(test.chainId);
    const success = result === test.expectedName;
    
    if (success) {
      passed++;
      console.log(`✅ Chain ${test.chainId}: ${result}`);
    } else {
      failed++;
      const error = `❌ Chain ${test.chainId}: Expected "${test.expectedName}", got "${result}"`;
      console.error(error);
      failures.push(error);
    }
  });
  
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${NETWORK_TESTS.length} tests`);
  
  if (failures.length > 0) {
    console.error('\n❌ Failed Tests:');
    failures.forEach(f => console.error(f));
  }
}

/**
 * Test native token symbol resolution
 * Copy the getNativeTokenSymbol function from use-wallet.ts to test
 */
export function testTokenSymbols(getNativeTokenSymbol: (chainId: number) => string): void {
  console.log('🧪 Testing Token Symbol Resolution...\n');
  
  let passed = 0;
  let failed = 0;
  const failures: string[] = [];
  
  NETWORK_TESTS.forEach(test => {
    const result = getNativeTokenSymbol(test.chainId);
    const success = result === test.expectedSymbol;
    
    if (success) {
      passed++;
      console.log(`✅ Chain ${test.chainId}: ${result}`);
    } else {
      failed++;
      const error = `❌ Chain ${test.chainId}: Expected "${test.expectedSymbol}", got "${result}"`;
      console.error(error);
      failures.push(error);
    }
  });
  
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${NETWORK_TESTS.length} tests`);
  
  if (failures.length > 0) {
    console.error('\n❌ Failed Tests:');
    failures.forEach(f => console.error(f));
  }
}

/**
 * Generate a summary of supported networks
 */
export function printNetworkSummary(): void {
  const mainnetCount = NETWORK_TESTS.filter(t => t.category === 'mainnet').length;
  const testnetCount = NETWORK_TESTS.filter(t => t.category === 'testnet').length;
  const devCount = NETWORK_TESTS.filter(t => t.category === 'development').length;
  
  console.log('📊 Network Support Summary\n');
  console.log(`Total Networks: ${NETWORK_TESTS.length}`);
  console.log(`  - Mainnets: ${mainnetCount}`);
  console.log(`  - Testnets: ${testnetCount}`);
  console.log(`  - Development: ${devCount}\n`);
  
  // Group by ecosystem
  const ecosystems = new Map<string, number>();
  NETWORK_TESTS.forEach(test => {
    const ecosystem = test.expectedName.split(' ')[0];
    ecosystems.set(ecosystem, (ecosystems.get(ecosystem) || 0) + 1);
  });
  
  console.log('🌐 Networks by Ecosystem:');
  Array.from(ecosystems.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, count]) => {
      console.log(`  ${name}: ${count}`);
    });
}

/**
 * Browser console helper
 * Run this in the browser console to test all networks
 */
export function runAllTests(): void {
  console.clear();
  console.log('🚀 Starting Network Configuration Tests\n');
  console.log('='.repeat(50) + '\n');
  
  printNetworkSummary();
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Instructions for manual testing
  console.log('📝 To test the actual functions:');
  console.log('1. Import the functions from use-wallet.ts');
  console.log('2. Run: testNetworkNames(getNetworkName)');
  console.log('3. Run: testTokenSymbols(getNativeTokenSymbol)');
  console.log('\nOr manually test by switching networks in MetaMask');
}
