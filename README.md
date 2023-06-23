# Next.js Smartcontract Raffle (DDEENNY)

Live Demo Fleek: [https://sparkling-union-7048.on.fleek.co/](https://sparkling-union-7048.on.fleek.co/)

This is a decentralized raffle application built with Next.js and Ethereum smart contracts.

## Description

The Next.js Smart Contract Raffle is a web application that allows users to participate in a raffle by purchasing tickets using Ethereum. The raffle follows the following rules:

- Each raffle ticket costs 0.1 ETH.
- Participants can only enter the raffle when the status is open.
- If the drawn number is 6, the participant wins the prize.
- If a participant wins, they will receive 90% of the contract balance.
- The remaining 10% of the ticket price will be transferred to the contract owner.

## Features

- Participants can purchase raffle tickets using Ethereum.
- The winner is selected randomly based on the drawn number.
- Smart contracts ensure the security and transparency of the raffle process.
- Real-time updates of raffle status and winner announcement.

## Installation

1. Clone the repository:

```
git clone https://github.com/a399555720/nextjs-smartcontract-raffle-ddeenny
```

2. Install the dependencies using Yarn:

```
cd nextjs-smartcontract-raffle
yarn install
yarn dev
```

# Usage

1. Run this code

```
yarn dev
```

2. Go to UI and have fun!

Head over to your [localhost](http://localhost:3000) and play with the lottery!

# Deploying to IPFS

1. Build your static code.

```
yarn build
```

2. Export your site

```
yarn next export
```

> Note: Some features of NextJS & Moralis are not static, if you're deviating from this repo, you might run into errors. 

3. Deploy to IPFS

- [Download IPFS desktop](https://ipfs.io/#install)
- Open your [IPFS desktop app](https://ipfs.io/)
- Select `import` and choose the folder the above step just created (should be `out`)

4. Copy the CID of the folder you pinned

5. Get [IPFS companion](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch?hl=en) for your browser (or use [Brave Browser](https://brave.com/))

5. Go to `ipfs://YOUR_CID_HERE` and see your ipfs deployed site!


# Deploy to IPFS using Fleek

You can also have [Fleek](https://fleek.co/) auto-deploy your website if you connect your github. Connect to fleek and follow along the docs there. You'll get an IPFS hash and a "regular" URL for your site. 


# Linting

To check linting / code formatting:
```
yarn lint
```


# Thank you!

