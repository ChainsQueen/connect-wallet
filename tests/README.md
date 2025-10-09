# Test Directory

This directory contains test utilities and validation scripts for the wallet integration.

## Files

### `network-validation.test.js`
**Type**: Node.js test runner  
**Purpose**: Validates network configuration (names and token symbols)  
**Usage**:
```bash
node tests/network-validation.test.js
```

**What it tests**:
- ✅ Network name resolution for all 42 supported chains
- ✅ Native token symbol mapping for all chains
- ✅ Configuration consistency

**When to run**:
- After adding new network support
- Before committing network configuration changes
- In CI/CD pipeline

### `network-utils.ts`
**Type**: TypeScript utility module  
**Purpose**: Browser-based network testing utilities  
**Usage**:
```typescript
import { NETWORK_TESTS, testNetworkNames, testTokenSymbols } from './tests/network-utils';

// In browser console or React component
testNetworkNames(getNetworkName);
testTokenSymbols(getNativeTokenSymbol);
```

**What it provides**:
- Network test data for all supported chains
- Test functions for browser console debugging
- Network summary utilities

**When to use**:
- Debugging network detection in browser
- Manual testing with MetaMask
- Runtime validation in development

## Quick Start

Run all network validation tests:
```bash
npm run test:networks
# or
pnpm test:networks
```

## Supported Networks

The wallet currently supports **42 networks** across:
- 17 Mainnets
- 23 Testnets
- 2 Development networks

See test output for complete list of supported chains.
