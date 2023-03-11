import { IState } from "../pages/SimonSays"

interface Promps {
    gameState: IState['gameState']
    startGame: () => void
    closeLostModle: () => void
}

export default function LostModal({ gameState, closeLostModle, startGame }: Promps) {


    const { isLost, score } = gameState
    return (
        <section >
            {isLost && <article className="lost-modal">
                <h1>too bad you've lost..</h1>
                <h4>youre score is {score} points</h4>
                <h5>whant to try agine?</h5>
                <section className="btns">
                    <button onClick={startGame}>let's go!</button>
                    <button onClick={closeLostModle}>no tankes</button>
                </section>
            </article>}
        </section>
    )
}