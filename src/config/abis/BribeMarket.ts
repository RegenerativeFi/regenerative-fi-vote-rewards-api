export const BribeMarketAbi = [
  {
    inputs: [],
    name: "AlreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "DeadlinePassed",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidChoiceCount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidDeadline",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidIdentifier",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMaxPeriod",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPeriod",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPeriodDuration",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidProtocol",
    type: "error",
  },
  {
    inputs: [],
    name: "NoWhitelistBribeVault",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "NotTeamMember",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenNotWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "VoterBlacklisted",
    type: "error",
  },
  {
    inputs: [],
    name: "VoterNotBlacklisted",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "voters",
        type: "address[]",
      },
    ],
    name: "AddBlacklistedVoters",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
    ],
    name: "AddWhitelistedTokens",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "teamMember",
        type: "address",
      },
    ],
    name: "GrantTeamRole",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "bribeVault",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "protocol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "maxPeriods",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "periodDuration",
        type: "uint256",
      },
    ],
    name: "Initialize",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "voters",
        type: "address[]",
      },
    ],
    name: "RemoveBlacklistedVoters",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
    ],
    name: "RemoveWhitelistedTokens",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "teamMember",
        type: "address",
      },
    ],
    name: "RevokeTeamRole",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "maxPeriods",
        type: "uint256",
      },
    ],
    name: "SetMaxPeriods",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "periodDuration",
        type: "uint256",
      },
    ],
    name: "SetPeriodDuration",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "proposals",
        type: "bytes32[]",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "SetProposals",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "proposals",
        type: "bytes32[]",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "SetProposalsByAddress",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "proposalIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "proposals",
        type: "bytes32[]",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "SetProposalsById",
    type: "event",
  },
  {
    inputs: [],
    name: "BRIBE_VAULT",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_PERIODS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_PERIOD_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PROTOCOL",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TEAM_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_voters",
        type: "address[]",
      },
    ],
    name: "addBlacklistedVoters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
    ],
    name: "addWhitelistedTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_proposal",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxTokensPerVote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_periods",
        type: "uint256",
      },
    ],
    name: "depositBribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_proposal",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxTokensPerVote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_periods",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_permitDeadline",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "depositBribeWithPermit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBlacklistedVoters",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_proposal",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_proposalDeadline",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "getBribe",
    outputs: [
      {
        internalType: "address",
        name: "bribeToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "bribeAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "bribeProposal",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWhitelistedTokens",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_teamMember",
        type: "address",
      },
    ],
    name: "grantTeamRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "indexOfBlacklistedVoter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "indexOfWhitelistedToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bribeVault",
        type: "address",
      },
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "string",
        name: "_protocol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_maxPeriods",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_periodDuration",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_voter",
        type: "address",
      },
    ],
    name: "isBlacklistedVoter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "isWhitelistedToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxPeriods",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "periodDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "proposalDeadlines",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_voters",
        type: "address[]",
      },
    ],
    name: "removeBlacklistedVoters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
    ],
    name: "removeWhitelistedTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_teamMember",
        type: "address",
      },
    ],
    name: "revokeTeamRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_periods",
        type: "uint256",
      },
    ],
    name: "setMaxPeriods",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_periodDuration",
        type: "uint256",
      },
    ],
    name: "setPeriodDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "_identifiers",
        type: "bytes[]",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "setProposals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_addresses",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "setProposalsByAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_proposalIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_choiceCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "setProposalsById",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
