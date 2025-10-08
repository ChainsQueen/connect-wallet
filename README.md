# Wallet Connection Demo

[![CI](https://github.com/ChainsQueen/connect-wallet/actions/workflows/ci.yml/badge.svg)](https://github.com/ChainsQueen/connect-wallet/actions/workflows/ci.yml)
[![Deploy](https://github.com/ChainsQueen/connect-wallet/actions/workflows/deploy.yml/badge.svg)](https://github.com/ChainsQueen/connect-wallet/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ethers.js](https://img.shields.io/badge/ethers.js-6.15-2535a0?logo=ethereum&logoColor=white)](https://docs.ethers.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A modern, production-ready wallet integration built with React, TypeScript, and ethers.js supporting 40+ blockchain networks.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:5173` and click "Connect Wallet" to connect your MetaMask wallet.

## ✨ Features

- ✅ **Connect/Disconnect Wallet** - Seamless MetaMask integration
- ✅ **Display Wallet Address** - Formatted and user-friendly
- ✅ **Show ETH Balance** - Real-time balance display
- ✅ **Error Handling** - Comprehensive error messages
- ✅ **Auto-reconnection** - Remembers previous connection
- ✅ **Account Switching** - Detects and updates on account change
- ✅ **Modern UI** - Beautiful gradient design with animations

## 📚 Documentation

See [WALLET_INTEGRATION.md](./WALLET_INTEGRATION.md) for complete documentation including:
- Architecture overview
- Implementation details
- Usage guide
- Troubleshooting

## 🛠️ Tech Stack

- **React 19.1.1** - UI framework
- **TypeScript 5.9.3** - Type safety
- **ethers.js 6.15.0** - Ethereum interaction
- **Vite 7.1.7** - Build tool

## 📋 Requirements

- Node.js 18+
- MetaMask browser extension
- pnpm (or npm/yarn)

## 🏗️ Project Structure

```
src/
├── core/hooks/          # Business logic (useWallet hook)
├── partials/            # UI components (WalletConnect)
├── types/               # TypeScript declarations
├── App.tsx              # Main application
└── App.css              # Global styles
```

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
