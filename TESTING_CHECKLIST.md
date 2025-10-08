# Testing Checklist

Use this checklist to verify all features are working correctly.

## Prerequisites
- [ ] MetaMask extension installed in browser
- [ ] MetaMask wallet unlocked
- [ ] Dev server running (`pnpm dev`)
- [ ] Browser opened to `http://localhost:5173`

## Core Features

### 1. Initial Load
- [ ] Page loads without errors
- [ ] "Ethereum Wallet Integration Demo" title visible
- [ ] Wallet card displays with gradient background
- [ ] "Not Connected" status shows with red indicator
- [ ] "Connect Wallet" button is visible and enabled
- [ ] MetaMask installation link is visible

### 2. Wallet Connection
- [ ] Click "Connect Wallet" button
- [ ] Button shows "Connecting..." with spinner
- [ ] MetaMask popup appears
- [ ] Select an account and click "Next"
- [ ] Click "Connect" in MetaMask
- [ ] Status changes to "Connected" with green indicator
- [ ] Wallet address displays in format: `0x1234...5678`
- [ ] ETH balance displays (e.g., `0.1234 ETH`)
- [ ] "Disconnect Wallet" button appears

### 3. Wallet Disconnection
- [ ] Click "Disconnect Wallet" button
- [ ] Status changes to "Not Connected"
- [ ] Wallet address disappears
- [ ] Balance disappears
- [ ] "Connect Wallet" button reappears

### 4. Error Handling

#### User Rejection
- [ ] Click "Connect Wallet"
- [ ] Click "Cancel" or "Reject" in MetaMask popup
- [ ] Error message appears: "Connection request rejected..."
- [ ] Error has warning icon (⚠️)
- [ ] Can retry connection after error

#### MetaMask Not Installed (Test in incognito without MetaMask)
- [ ] Open in browser without MetaMask
- [ ] Error message: "MetaMask is not installed..."
- [ ] Installation link is visible and clickable

#### Pending Request
- [ ] Click "Connect Wallet"
- [ ] Don't respond to MetaMask popup
- [ ] Click "Connect Wallet" again
- [ ] Error message: "Connection request already pending..."

### 5. Auto-reconnection
- [ ] Connect wallet successfully
- [ ] Refresh the page (F5 or Cmd+R)
- [ ] Wallet automatically reconnects
- [ ] Address and balance display without clicking connect

### 6. Account Switching
- [ ] Connect wallet
- [ ] Open MetaMask
- [ ] Switch to a different account
- [ ] UI automatically updates with new address
- [ ] Balance updates for new account

### 7. Network Switching
- [ ] Connect wallet
- [ ] Open MetaMask
- [ ] Switch network (e.g., from Mainnet to Sepolia)
- [ ] Page reloads automatically
- [ ] Wallet reconnects on new network

## UI/UX Testing

### Visual Design
- [ ] Gradient background on wallet card (purple/blue)
- [ ] Smooth hover effects on buttons
- [ ] Status indicator pulses (animation)
- [ ] Card has subtle shadow
- [ ] Card lifts on hover (transform)
- [ ] Text is readable and well-contrasted

### Responsive Design
- [ ] Resize browser to mobile width (< 600px)
- [ ] Layout adjusts properly
- [ ] Text remains readable
- [ ] Buttons are touch-friendly
- [ ] No horizontal scrolling

### Animations
- [ ] Connect button hover effect works
- [ ] Disconnect button hover effect works
- [ ] Status indicator pulses continuously
- [ ] Spinner rotates during connection
- [ ] Error message slides in smoothly

### Accessibility
- [ ] Can tab through interactive elements
- [ ] Button focus states are visible
- [ ] Address is copyable (hover shows it's interactive)
- [ ] All text is readable

## Edge Cases

### Balance Display
- [ ] Balance shows 4 decimal places
- [ ] Balance is 0.0000 if account has no ETH
- [ ] Balance updates when switching accounts
- [ ] Balance color is gold/yellow

### Address Display
- [ ] Address is truncated (0x1234...5678)
- [ ] Full address visible on hover (title attribute)
- [ ] Address has background highlight
- [ ] Address hover effect works

### Loading States
- [ ] Spinner appears during connection
- [ ] Button is disabled while connecting
- [ ] Button text changes to "Connecting..."
- [ ] No double-clicks possible during connection

## Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Brave
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if MetaMask available)

## Console Checks

Open browser DevTools Console:
- [ ] No error messages in console
- [ ] No TypeScript errors
- [ ] No React warnings
- [ ] Clean console output

## Performance

- [ ] Initial page load is fast (< 1s)
- [ ] Connection happens quickly (< 3s)
- [ ] Balance fetch is fast (< 1s)
- [ ] No lag when switching accounts
- [ ] Smooth animations (60fps)

## Code Quality Verification

- [ ] Run `pnpm build` - builds without errors
- [ ] Run `pnpm lint` - no linting errors
- [ ] TypeScript compilation succeeds
- [ ] All imports resolve correctly

## Production Build Test

```bash
pnpm build
pnpm preview
```

- [ ] Production build succeeds
- [ ] Preview server starts
- [ ] All features work in production build
- [ ] No console errors in production

## Final Checks

- [ ] README.md is up to date
- [ ] WALLET_INTEGRATION.md is comprehensive
- [ ] All code is commented
- [ ] File structure follows conventions
- [ ] No unused imports or variables
- [ ] No console.log statements (except intentional)

---

## Test Results

**Date Tested**: _________________

**Tester**: _________________

**Browser**: _________________

**MetaMask Version**: _________________

**Result**: ✅ PASS / ❌ FAIL

**Notes**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
