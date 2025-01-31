export const RewardsOnlyGaugeAbi = [
  {
    name: "Deposit",
    inputs: [
      {
        name: "provider",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
    type: "event",
  },
  {
    name: "Withdraw",
    inputs: [
      {
        name: "provider",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
    type: "event",
  },
  {
    name: "Transfer",
    inputs: [
      {
        name: "_from",
        type: "address",
        indexed: true,
      },
      {
        name: "_to",
        type: "address",
        indexed: true,
      },
      {
        name: "_value",
        type: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
    type: "event",
  },
  {
    name: "Approval",
    inputs: [
      {
        name: "_owner",
        type: "address",
        indexed: true,
      },
      {
        name: "_spender",
        type: "address",
        indexed: true,
      },
      {
        name: "_value",
        type: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
    type: "event",
  },
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      {
        name: "_bal_token",
        type: "address",
      },
      {
        name: "_vault",
        type: "address",
      },
      {
        name: "_authorizerAdaptor",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "version",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "reward_contract",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "last_claim",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "claimed_reward",
    inputs: [
      {
        name: "_addr",
        type: "address",
      },
      {
        name: "_token",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "claimable_reward",
    inputs: [
      {
        name: "_addr",
        type: "address",
      },
      {
        name: "_token",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "reward_data",
    inputs: [
      {
        name: "_token",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          {
            name: "token",
            type: "address",
          },
          {
            name: "distributor",
            type: "address",
          },
          {
            name: "period_finish",
            type: "uint256",
          },
          {
            name: "rate",
            type: "uint256",
          },
          {
            name: "last_update",
            type: "uint256",
          },
          {
            name: "integral",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "claimable_reward_write",
    inputs: [
      {
        name: "_addr",
        type: "address",
      },
      {
        name: "_token",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "set_rewards_receiver",
    inputs: [
      {
        name: "_receiver",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "claim_rewards",
    inputs: [],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "claim_rewards",
    inputs: [
      {
        name: "_addr",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "claim_rewards",
    inputs: [
      {
        name: "_addr",
        type: "address",
      },
      {
        name: "_receiver",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "deposit",
    inputs: [
      {
        name: "_value",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "deposit",
    inputs: [
      {
        name: "_value",
        type: "uint256",
      },
      {
        name: "_addr",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "deposit",
    inputs: [
      {
        name: "_value",
        type: "uint256",
      },
      {
        name: "_addr",
        type: "address",
      },
      {
        name: "_claim_rewards",
        type: "bool",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "withdraw",
    inputs: [
      {
        name: "_value",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "withdraw",
    inputs: [
      {
        name: "_value",
        type: "uint256",
      },
      {
        name: "_claim_rewards",
        type: "bool",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "transfer",
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "allowance",
    inputs: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "permit",
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
      {
        name: "_deadline",
        type: "uint256",
      },
      {
        name: "_v",
        type: "uint8",
      },
      {
        name: "_r",
        type: "bytes32",
      },
      {
        name: "_s",
        type: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "increaseAllowance",
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_added_value",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "decreaseAllowance",
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_subtracted_value",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "set_rewards",
    inputs: [
      {
        name: "_reward_contract",
        type: "address",
      },
      {
        name: "_claim_sig",
        type: "bytes32",
      },
      {
        name: "_reward_tokens",
        type: "address[8]",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_lp_token",
        type: "address",
      },
      {
        name: "_reward_contract",
        type: "address",
      },
      {
        name: "_claim_sig",
        type: "bytes32",
      },
    ],
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "lp_token",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "arg0",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "DOMAIN_SEPARATOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "nonces",
    inputs: [
      {
        name: "arg0",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "reward_tokens",
    inputs: [
      {
        name: "arg0",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "reward_balances",
    inputs: [
      {
        name: "arg0",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "rewards_receiver",
    inputs: [
      {
        name: "arg0",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "claim_sig",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "reward_integral",
    inputs: [
      {
        name: "arg0",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "reward_integral_for",
    inputs: [
      {
        name: "arg0",
        type: "address",
      },
      {
        name: "arg1",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
] as const;
