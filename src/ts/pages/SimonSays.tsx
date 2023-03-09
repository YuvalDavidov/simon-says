import { useEffect, useState } from "react"
import BoardGame from "../cmps/BoardGame"
import Modal from "../cmps/Modal"

export interface IState {
    gameState: {
        isOn: boolean,
        isLost: boolean,
        score: number
    }
}

export default function SimonSays() {

    const [higthScore, setHigthScore] = useState<number>(0)
    const [isIntroModalOpen, setIsIntroModalOpen] = useState<boolean>(true)
    const [gameState, setGameState] = useState<IState['gameState']>({ isOn: false, isLost: false, score: 0 })

    useEffect(() => { console.log(gameState); }, [gameState])

    function startGame() {
        setGameState({ isOn: true, isLost: false, score: 0 })

    }

    function onToggleModal() {
        setIsIntroModalOpen(!isIntroModalOpen)

        startGame()
    }

    function onLose() {
        setHigthScore(gameState.score)
        setGameState(prevGameState => ({ ...prevGameState, isPlaying: false, isLost: true }))
    }

    return (<>
        <Modal isIntroModalOpen={isIntroModalOpen} onToggleModal={onToggleModal} />
        <h2 className="score"> higth score: {higthScore}</h2>
        <section className="main-layout">
            <BoardGame gameState={gameState} onLose={onLose} setGameState={setGameState} />


        </section>
    </>
    )
}