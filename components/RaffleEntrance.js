import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi } from "../constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function RaffleEntrance() {
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const [entranceFee, setEntranceFee] = useState("0")
    const [raffleState, setRaffleState] = useState("0")
    const [drawnNum, setDrawnNum] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const [raffleBalance, setRaffleBalance] = useState("0")
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org/")
    const raffleAddress = "0xe88AF1d933aE81F0bD532ECE576b207e1b32D627"
    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFeeInEth } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFeeInEth",
        params: {},
    })

    const { runContractFunction: getRaffleState } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRaffleState",
        params: {},
    })

    const { runContractFunction: getRecentRandNum } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentRandNum",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFeeInEth())?.toString()
        const raffleStateFromCall = (await getRaffleState())?.toString()
        const recentWinnerFromCall = (await getRecentWinner())?.toString()
        const drawnNumFromCall = (await getRecentRandNum())?.toString()
        const raffleBalanceFromCall = (await provider.getBalance(raffleAddress)).toString()
        setEntranceFee(entranceFeeFromCall)
        setRaffleState(raffleStateFromCall)
        setRecentWinner(recentWinnerFromCall)
        setDrawnNum(drawnNumFromCall)
        setRaffleBalance(raffleBalanceFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            const interval = setInterval(updateUI, 500)

            return () => {
                clearInterval(interval)
            }
        }
    }, [isWeb3Enabled])

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async function (tx) {
        await tx.wait("1")
        handleNewNotification(tx)
    }

    return (
        <div className="p-5 font-bold">
            {isWeb3Enabled && chainId == "11155111" ? (
                <>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async function () {
                            await enterRaffle({ onSuccess: handleSuccess, onError: (error) => console.log(error) })
                        }}
                        disabled={isLoading || isFetching || raffleState == "1"}
                    >
                        {isLoading || isFetching || raffleState == "1" ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Enter Raffle"
                        )}
                    </button>
                    <div className="empty-line"></div>
                    <div>Entrance Fee: {entranceFee ? ethers.utils.formatUnits(entranceFee, "ether") : 0} ETH</div>
                    <div>Raffle State: {raffleState == "0" ? "Open" : "Calculating"}</div>
                    <div>Drown Number: {raffleState == "0" ? drawnNum : "N/A"}</div>
                    <dic>Recent Winner: {recentWinner}</dic>
                    <div>Raffle Contract Balance: {ethers.utils.formatUnits(raffleBalance)} ETH</div>
                    <div>
                        Raffle Contract Address:{" "}
                        <a
                            href="https://sepolia.etherscan.io/address/0xe88AF1d933aE81F0bD532ECE576b207e1b32D627"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "blue" }}
                        >
                            https://sepolia.etherscan.io/address/0xe88AF1d933aE81F0bD532ECE576b207e1b32D627
                        </a>
                    </div>
                    <div className="empty-line"></div>
                    <div className="text-xl">description:</div>
                    <div>One entrance fee for the raffle is 100 USD worth of ETH.</div>
                    <div>You can only enter raffle when the status is open.</div>
                    <div>If the drawn number is 6, you will win the prize.</div>
                    <div>If you win, you will receive 90% of the contract balance.</div>
                    <div>The entrance fee will be subject to a 10% transfer to the owner.</div>
                </>
            ) : (
                <div>Please connect to wallet and sepolia test network </div>
            )}
        </div>
    )
}
