// MetaMask utility functions for CBDC wallet integration

export interface MetaMaskError {
  code: number
  message: string
}

export interface ConnectResult {
  success: boolean
  address: string
  error?: string
}

export interface BalanceResult {
  success: boolean
  balance: string
  error?: string
}

export interface NetworkResult {
  success: boolean
  chainId: string
  networkName: string
  currency: string
  isTestnet: boolean
  isSupported: boolean
  error?: string
}

export interface SignResult {
  success: boolean
  signature?: string
  error?: string
}

export interface NetworkConfig {
  chainId: string
  chainName: string
  name: string
  currency: string
  decimals: number
  rpcUrls: string[]
  blockExplorerUrls: string[]
  isTestnet: boolean
  isSupported: boolean
}

// Supported networks configuration
const SUPPORTED_NETWORKS: Record<string, NetworkConfig> = {
  "0x1": {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    name: "Ethereum Mainnet",
    currency: "ETH",
    decimals: 18,
    rpcUrls: ["https://mainnet.infura.io/v3/", "https://eth-mainnet.public.blastapi.io"],
    blockExplorerUrls: ["https://etherscan.io"],
    isTestnet: false,
    isSupported: true,
  },
  "0xaa36a7": {
    chainId: "0xaa36a7",
    chainName: "Sepolia",
    name: "Sepolia Testnet",
    currency: "ETH",
    decimals: 18,
    rpcUrls: ["https://sepolia.infura.io/v3/", "https://eth-sepolia.public.blastapi.io"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
    isTestnet: true,
    isSupported: true,
  },
  "0x4268": {
    chainId: "0x4268",
    chainName: "Holesky",
    name: "Holesky Testnet",
    currency: "ETH",
    decimals: 18,
    rpcUrls: [
      "https://ethereum-holesky.publicnode.com",
      "https://holesky.rpc.thirdweb.com",
      "https://rpc.holesky.ethpandaops.io",
    ],
    blockExplorerUrls: ["https://holesky.etherscan.io"],
    isTestnet: true,
    isSupported: true,
  },
  "0x88c50": {
    chainId: "0x88c50",
    chainName: "Ethereum Hoodi",
    name: "Ethereum Hoodi",
    currency: "ETH",
    decimals: 18,
    rpcUrls: [
      "https://hoodi.drpc.org",
    ],
    blockExplorerUrls: ["https://hoodi.etherscan.io"],
    isTestnet: true,
    isSupported: true,
  },
  "0x5": {
    chainId: "0x5",
    chainName: "Goerli",
    name: "Goerli Testnet",
    currency: "ETH",
    decimals: 18,
    rpcUrls: ["https://goerli.infura.io/v3/", "https://eth-goerli.public.blastapi.io"],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
    isTestnet: true,
    isSupported: true,
  },
  "0x89": {
    chainId: "0x89",
    chainName: "Polygon Mainnet",
    name: "Polygon Mainnet",
    currency: "MATIC",
    decimals: 18,
    rpcUrls: ["https://polygon-rpc.com", "https://rpc-mainnet.matic.network"],
    blockExplorerUrls: ["https://polygonscan.com"],
    isTestnet: false,
    isSupported: true,
  },
  "0x13881": {
    chainId: "0x13881",
    chainName: "Polygon Mumbai",
    name: "Polygon Mumbai",
    currency: "MATIC",
    decimals: 18,
    rpcUrls: ["https://rpc-mumbai.maticvigil.com", "https://polygon-mumbai.blockpi.network/v1/rpc/public"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    isTestnet: true,
    isSupported: true,
  },
  "0xa86a": {
    chainId: "0xa86a",
    chainName: "Avalanche C-Chain",
    name: "Avalanche C-Chain",
    currency: "AVAX",
    decimals: 18,
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://snowtrace.io"],
    isTestnet: false,
    isSupported: true,
  },
  "0xa869": {
    chainId: "0xa869",
    chainName: "Avalanche Fuji",
    name: "Avalanche Fuji Testnet",
    currency: "AVAX",
    decimals: 18,
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io"],
    isTestnet: true,
    isSupported: true,
  },
  "0x38": {
    chainId: "0x38",
    chainName: "BSC Mainnet",
    name: "BNB Smart Chain",
    currency: "BNB",
    decimals: 18,
    rpcUrls: ["https://bsc-dataseed.binance.org", "https://bsc-dataseed1.defibit.io"],
    blockExplorerUrls: ["https://bscscan.com"],
    isTestnet: false,
    isSupported: true,
  },
  "0x61": {
    chainId: "0x61",
    chainName: "BSC Testnet",
    name: "BNB Smart Chain Testnet",
    currency: "BNB",
    decimals: 18,
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
    isTestnet: true,
    isSupported: true,
  },
}

// Check if MetaMask is installed
export function isMetaMaskInstalled(): boolean {
  return typeof window !== "undefined" && typeof window.ethereum !== "undefined" && Boolean(window.ethereum.isMetaMask)
}

// Get connected accounts
export async function getConnectedAccounts(): Promise<string[]> {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed")
  }

  try {
    const accounts = await window.ethereum!.request({
      method: "eth_accounts",
    })
    return accounts || []
  } catch (error: any) {
    console.error("Error getting connected accounts:", error)
    return []
  }
}

// Connect to MetaMask
export async function connectMetaMask(): Promise<ConnectResult> {
  if (!isMetaMaskInstalled()) {
    return {
      success: false,
      address: "",
      error: "MetaMask is not installed. Please install MetaMask to continue.",
    }
  }

  try {
    const accounts = await window.ethereum!.request({
      method: "eth_requestAccounts",
    })

    if (accounts && accounts.length > 0) {
      return {
        success: true,
        address: accounts[0],
      }
    } else {
      return {
        success: false,
        address: "",
        error: "No accounts found. Please make sure MetaMask is unlocked.",
      }
    }
  } catch (error: any) {
    let errorMessage = "Failed to connect to MetaMask"

    if (error.code === 4001) {
      errorMessage = "Connection rejected by user"
    } else if (error.code === -32002) {
      errorMessage = "Connection request already pending"
    } else if (error.message) {
      errorMessage = error.message
    }

    return {
      success: false,
      address: "",
      error: errorMessage,
    }
  }
}

// Get account balance
export async function getBalance(address: string): Promise<BalanceResult> {
  if (!isMetaMaskInstalled()) {
    return {
      success: false,
      balance: "0",
      error: "MetaMask is not installed",
    }
  }

  try {
    const balance = await window.ethereum!.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    })

    // Convert from wei to ether
    const balanceInEther = (Number.parseInt(balance, 16) / Math.pow(10, 18)).toFixed(6)

    return {
      success: true,
      balance: balanceInEther,
    }
  } catch (error: any) {
    return {
      success: false,
      balance: "0",
      error: error.message || "Failed to get balance",
    }
  }
}

// Get current network information
export async function getCurrentNetwork(): Promise<NetworkResult> {
  if (!isMetaMaskInstalled()) {
    return {
      success: false,
      chainId: "",
      networkName: "Unknown",
      currency: "ETH",
      isTestnet: false,
      isSupported: false,
      error: "MetaMask is not installed",
    }
  }

  try {
    const chainId = await window.ethereum!.request({
      method: "eth_chainId",
    })

    const networkConfig = SUPPORTED_NETWORKS[chainId]

    if (networkConfig) {
      return {
        success: true,
        chainId: chainId,
        networkName: networkConfig.name,
        currency: networkConfig.currency,
        isTestnet: networkConfig.isTestnet,
        isSupported: networkConfig.isSupported,
      }
    } else {
      return {
        success: true,
        chainId: chainId,
        networkName: `Unknown Network (${chainId})`,
        currency: "ETH",
        isTestnet: false,
        isSupported: false,
      }
    }
  } catch (error: any) {
    return {
      success: false,
      chainId: "",
      networkName: "Unknown",
      currency: "ETH",
      isTestnet: false,
      isSupported: false,
      error: error.message || "Failed to get network information",
    }
  }
}

// Switch to a specific network
export async function switchToNetwork(chainId: string): Promise<boolean> {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed")
  }

  const networkConfig = SUPPORTED_NETWORKS[chainId]
  if (!networkConfig) {
    throw new Error("Unsupported network")
  }

  try {
    await window.ethereum!.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    })
    return true
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum!.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: networkConfig.chainId,
              chainName: networkConfig.chainName,
              nativeCurrency: {
                name: networkConfig.currency,
                symbol: networkConfig.currency,
                decimals: networkConfig.decimals,
              },
              rpcUrls: networkConfig.rpcUrls,
              blockExplorerUrls: networkConfig.blockExplorerUrls,
            },
          ],
        })
        return true
      } catch (addError: any) {
        console.error("Error adding network:", addError)
        throw new Error("Failed to add network")
      }
    } else {
      console.error("Error switching network:", switchError)
      throw new Error("Failed to switch network")
    }
  }
}

// Sign a message
export async function signMessage(message: string, address: string): Promise<SignResult> {
  if (!isMetaMaskInstalled()) {
    return {
      success: false,
      error: "MetaMask is not installed",
    }
  }

  try {
    const signature = await window.ethereum!.request({
      method: "personal_sign",
      params: [message, address],
    })

    return {
      success: true,
      signature: signature,
    }
  } catch (error: any) {
    let errorMessage = "Failed to sign message"

    if (error.code === 4001) {
      errorMessage = "Signature rejected by user"
    } else if (error.message) {
      errorMessage = error.message
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}

// Format address for display
export function formatAddress(address: string): string {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Get block explorer URL for a given chain
export function getExplorerUrl(chainId: string): string | null {
  const networkConfig = SUPPORTED_NETWORKS[chainId]
  return networkConfig ? networkConfig.blockExplorerUrls[0] : null
}

// Get recommended networks for the selector
export function getRecommendedNetworks(): NetworkConfig[] {
  return Object.values(SUPPORTED_NETWORKS).filter((network) => network.isSupported)
}

// Setup MetaMask event listeners
export function setupMetaMaskListeners(callbacks: {
  onAccountsChanged?: (accounts: string[]) => void
  onChainChanged?: (chainId: string) => void
  onConnect?: (connectInfo: { chainId: string }) => void
  onDisconnect?: (error: { code: number; message: string }) => void
}) {
  if (!isMetaMaskInstalled()) return

  if (callbacks.onAccountsChanged && window.ethereum) {
    window.ethereum.on("accountsChanged", callbacks.onAccountsChanged)
  }

  if (callbacks.onChainChanged && window.ethereum) {
    window.ethereum.on("chainChanged", callbacks.onChainChanged)
  }

  if (callbacks.onConnect && window.ethereum) {
    window.ethereum.on("connect", callbacks.onConnect)
  }

  if (callbacks.onDisconnect && window.ethereum) {
    window.ethereum.on("disconnect", callbacks.onDisconnect)
  }
}

// Remove MetaMask event listeners
export function removeMetaMaskListeners() {
  if (!isMetaMaskInstalled()) return

  window.ethereum?.removeAllListeners("accountsChanged")
  window.ethereum?.removeAllListeners("chainChanged")
  window.ethereum?.removeAllListeners("connect")
  window.ethereum?.removeAllListeners("disconnect")
}

// Transaction interfaces
export interface TransactionParams {
  from: string
  to: string
  value: string // in wei (hex)
  gas?: string
  gasPrice?: string
  data?: string
}

export interface TransactionResult {
  success: boolean
  hash?: string
  error?: string
}

export interface TransactionReceipt {
  transactionHash: string
  blockNumber: string
  from: string
  to: string
  gasUsed: string
  status: string
}

export interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timestamp: number
  chainId: string
  networkName: string
  status: "pending" | "confirmed" | "failed"
  blockNumber?: string
  gasUsed?: string
}

// Send transaction
export async function sendTransaction(params: TransactionParams): Promise<TransactionResult> {
  if (!isMetaMaskInstalled()) {
    return {
      success: false,
      error: "MetaMask is not installed",
    }
  }

  try {
    const transactionHash = await window.ethereum?.request({
      method: "eth_sendTransaction",
      params: [params],
    })

    return {
      success: true,
      hash: transactionHash,
    }
  } catch (error: any) {
    let errorMessage = "Transaction failed"

    if (error.code === 4001) {
      errorMessage = "Transaction rejected by user"
    } else if (error.code === -32603) {
      errorMessage = "Internal error. Check your balance and try again."
    } else if (error.message) {
      errorMessage = error.message
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}

// Convert ETH to Wei (hex string)
export function ethToWei(eth: string): string {
  const wei = BigInt(Math.floor(Number.parseFloat(eth) * Math.pow(10, 18)))
  return "0x" + wei.toString(16)
}

// Convert Wei to ETH
export function weiToEth(wei: string): string {
  const weiValue = BigInt(wei)
  const ethValue = Number(weiValue) / Math.pow(10, 18)
  return ethValue.toFixed(6)
}

// Get transaction receipt
export async function getTransactionReceipt(hash: string): Promise<TransactionReceipt | null> {
  if (!isMetaMaskInstalled()) {
    return null
  }

  try {
    const receipt = await window.ethereum?.request({
      method: "eth_getTransactionReceipt",
      params: [hash],
    })

    return receipt
  } catch (error) {
    console.error("Error getting transaction receipt:", error)
    return null
  }
}

// Get transaction by hash
export async function getTransactionByHash(hash: string): Promise<any> {
  if (!isMetaMaskInstalled()) {
    return null
  }

  try {
    const transaction = await window.ethereum?.request({
      method: "eth_getTransactionByHash",
      params: [hash],
    })

    return transaction
  } catch (error) {
    console.error("Error getting transaction:", error)
    return null
  }
}

// Estimate gas for transaction
export async function estimateGas(params: TransactionParams): Promise<string | null> {
  if (!isMetaMaskInstalled()) {
    return null
  }

  try {
    const gasEstimate = await window.ethereum?.request({
      method: "eth_estimateGas",
      params: [params],
    })

    return gasEstimate
  } catch (error) {
    console.error("Error estimating gas:", error)
    return null
  }
}

// Get current gas price
export async function getGasPrice(): Promise<string | null> {
  if (!isMetaMaskInstalled()) {
    return null
  }

  try {
    const gasPrice = await window.ethereum?.request({
      method: "eth_gasPrice",
      params: [],
    })

    return gasPrice
  } catch (error) {
    console.error("Error getting gas price:", error)
    return null
  }
}

// Storage functions for transaction history
export function saveTransaction(transaction: Transaction): void {
  const transactions = getTransactionHistory(transaction.chainId)
  transactions.unshift(transaction)
  localStorage.setItem(`wasi_transactions_${transaction.chainId}`, JSON.stringify(transactions))
}

export function getTransactionHistory(chainId: string): Transaction[] {
  if (typeof window === "undefined") return []
  
  const stored = localStorage.getItem(`wasi_transactions_${chainId}`)
  if (!stored) return []
  
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function getAllTransactionHistory(): Transaction[] {
  if (typeof window === "undefined") return []
  
  const allTransactions: Transaction[] = []
  
  Object.keys(SUPPORTED_NETWORKS).forEach((chainId) => {
    const transactions = getTransactionHistory(chainId)
    allTransactions.push(...transactions)
  })
  
  return allTransactions.sort((a, b) => b.timestamp - a.timestamp)
}

export function updateTransactionStatus(hash: string, chainId: string, status: "confirmed" | "failed", receipt?: TransactionReceipt): void {
  const transactions = getTransactionHistory(chainId)
  const index = transactions.findIndex((tx) => tx.hash === hash)
  
  if (index !== -1) {
    transactions[index].status = status
    if (receipt) {
      transactions[index].blockNumber = receipt.blockNumber
      transactions[index].gasUsed = receipt.gasUsed
    }
    localStorage.setItem(`wasi_transactions_${chainId}`, JSON.stringify(transactions))
  }
}

// Get explorer transaction URL
export function getExplorerTransactionUrl(chainId: string, hash: string): string | null {
  const networkConfig = SUPPORTED_NETWORKS[chainId]
  if (!networkConfig) return null
  
  return `${networkConfig.blockExplorerUrls[0]}/tx/${hash}`
}

// Get explorer address URL
export function getExplorerAddressUrl(chainId: string, address: string): string | null {
  const networkConfig = SUPPORTED_NETWORKS[chainId]
  if (!networkConfig) return null
  
  return `${networkConfig.blockExplorerUrls[0]}/address/${address}`
}

// Declare global ethereum object for TypeScript
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
      removeAllListeners: (event: string) => void
    }
  }
}
