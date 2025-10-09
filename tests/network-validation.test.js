/**
 * Network Configuration Test Runner
 * Run with: node test-networks.js
 */

// Copy the network mapping functions from use-wallet.ts
const getNetworkName = (chainId) => {
  const networks = {
    // Ethereum
    1: 'Ethereum Mainnet',
    5: 'Goerli Testnet',
    11155111: 'Sepolia Testnet',
    17000: 'Holesky Testnet',
    // Polygon
    137: 'Polygon Mainnet',
    80001: 'Mumbai Testnet',
    80002: 'Amoy Testnet',
    // BSC
    56: 'BSC Mainnet',
    97: 'BSC Testnet',
    // Arbitrum
    42161: 'Arbitrum One',
    42170: 'Arbitrum Nova',
    421613: 'Arbitrum Goerli',
    421614: 'Arbitrum Sepolia',
    // Optimism
    10: 'Optimism',
    420: 'Optimism Goerli',
    11155420: 'Optimism Sepolia',
    // Base
    8453: 'Base',
    84531: 'Base Goerli',
    84532: 'Base Sepolia',
    // Avalanche
    43114: 'Avalanche C-Chain',
    43113: 'Avalanche Fuji',
    // Fantom
    250: 'Fantom Opera',
    4002: 'Fantom Testnet',
    // zkSync
    324: 'zkSync Era',
    280: 'zkSync Era Testnet',
    // Linea
    59144: 'Linea',
    59140: 'Linea Testnet',
    // Scroll
    534352: 'Scroll',
    534351: 'Scroll Sepolia',
    // Mantle
    5000: 'Mantle',
    5001: 'Mantle Testnet',
    // Celo
    42220: 'Celo',
    44787: 'Celo Alfajores',
    // Gnosis
    100: 'Gnosis Chain',
    10200: 'Gnosis Chiado',
    // Moonbeam
    1284: 'Moonbeam',
    1287: 'Moonbase Alpha',
    // Local/Dev
    1337: 'Localhost',
    31337: 'Hardhat Network',
    // Intuition
    13579: 'Intuition Testnet',
    // Sei
    1329: 'Sei Mainnet',
    713715: 'Sei Testnet',
  };
  return networks[chainId] || `Unknown Network (${chainId})`;
};

const getNativeTokenSymbol = (chainId) => {
  const symbols = {
    // Ethereum & L2s using ETH
    1: 'ETH',
    5: 'ETH',
    11155111: 'ETH',
    17000: 'ETH',
    42161: 'ETH',
    42170: 'ETH',
    421613: 'ETH',
    421614: 'ETH',
    10: 'ETH',
    420: 'ETH',
    11155420: 'ETH',
    8453: 'ETH',
    84531: 'ETH',
    84532: 'ETH',
    324: 'ETH',
    280: 'ETH',
    59144: 'ETH',
    59140: 'ETH',
    534352: 'ETH',
    534351: 'ETH',
    1284: 'GLMR',
    1287: 'DEV',
    // Polygon
    137: 'MATIC',
    80001: 'MATIC',
    80002: 'MATIC',
    // BSC
    56: 'BNB',
    97: 'BNB',
    // Avalanche
    43114: 'AVAX',
    43113: 'AVAX',
    // Fantom
    250: 'FTM',
    4002: 'FTM',
    // Mantle
    5000: 'MNT',
    5001: 'MNT',
    // Celo
    42220: 'CELO',
    44787: 'CELO',
    // Gnosis
    100: 'xDAI',
    10200: 'xDAI',
    // Local/Dev
    1337: 'ETH',
    31337: 'ETH',
    13579: 'TRUST',
    // Sei
    1329: 'SEI',
    713715: 'SEI',
  };
  return symbols[chainId] || 'ETH';
};

// Test data
const NETWORK_TESTS = [
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

// Test functions
function testNetworkNames() {
  console.log('🧪 Testing Network Name Resolution...\n');
  
  let passed = 0;
  let failed = 0;
  const failures = [];
  
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
  
  console.log(`\n📊 Network Names: ${passed} passed, ${failed} failed out of ${NETWORK_TESTS.length} tests`);
  return { passed, failed, failures };
}

function testTokenSymbols() {
  console.log('\n🧪 Testing Token Symbol Resolution...\n');
  
  let passed = 0;
  let failed = 0;
  const failures = [];
  
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
  
  console.log(`\n📊 Token Symbols: ${passed} passed, ${failed} failed out of ${NETWORK_TESTS.length} tests`);
  return { passed, failed, failures };
}

function printNetworkSummary() {
  const mainnetCount = NETWORK_TESTS.filter(t => t.category === 'mainnet').length;
  const testnetCount = NETWORK_TESTS.filter(t => t.category === 'testnet').length;
  const devCount = NETWORK_TESTS.filter(t => t.category === 'development').length;
  
  console.log('\n📊 Network Support Summary\n');
  console.log(`Total Networks: ${NETWORK_TESTS.length}`);
  console.log(`  - Mainnets: ${mainnetCount}`);
  console.log(`  - Testnets: ${testnetCount}`);
  console.log(`  - Development: ${devCount}\n`);
  
  // Group by ecosystem
  const ecosystems = new Map();
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

// Run all tests
console.clear();
console.log('🚀 Network Configuration Test Suite\n');
console.log('='.repeat(60) + '\n');

printNetworkSummary();

console.log('\n' + '='.repeat(60) + '\n');

const nameResults = testNetworkNames();
const symbolResults = testTokenSymbols();

console.log('\n' + '='.repeat(60));
console.log('\n📈 FINAL RESULTS\n');
console.log(`Network Names: ${nameResults.passed}/${NETWORK_TESTS.length} ✅`);
console.log(`Token Symbols: ${symbolResults.passed}/${NETWORK_TESTS.length} ✅`);

const totalTests = NETWORK_TESTS.length * 2;
const totalPassed = nameResults.passed + symbolResults.passed;
const totalFailed = nameResults.failed + symbolResults.failed;

console.log(`\nOverall: ${totalPassed}/${totalTests} tests passed`);

if (totalFailed === 0) {
  console.log('\n🎉 All tests passed! Network configuration is correct.\n');
} else {
  console.log(`\n⚠️  ${totalFailed} tests failed. Please review the errors above.\n`);
  process.exit(1);
}
