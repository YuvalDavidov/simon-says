import { useEffect, useState } from "react"
import BoardGame from "../cmps/BoardGame"
import LostModal from "../cmps/LostModal"
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

    function startGame() {
        setGameState({ isOn: true, isLost: false, score: 0 })
    }

    function closeLostModle() {
        setGameState({ isOn: false, isLost: false, score: 0 })
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
        <LostModal gameState={gameState} closeLostModle={closeLostModle} startGame={startGame} />
        <Modal isIntroModalOpen={isIntroModalOpen} onToggleModal={onToggleModal} />
        <section className="main-layout">
            <h2 className="higth-score full"> higth score: {higthScore}</h2>
            <section className="actions-btns full">
                <button onClick={() => { setIsIntroModalOpen(!isIntroModalOpen) }}>i</button>
                <button onClick={startGame}>new game</button>
            </section>

            <BoardGame gameState={gameState} onLose={onLose} setGameState={setGameState} />
        </section>
    </>
    )
}