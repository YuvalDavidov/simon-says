import { IState } from "../pages/SimonSays"
import { RefObject, useEffect, useRef, useState } from "react"
import sound1 from '../../assets/sound/simonSound1.mp3'
import sound2 from '../../assets/sound/simonSound2.mp3'
import sound3 from '../../assets/sound/simonSound3.mp3'
import sound4 from '../../assets/sound/simonSound4.mp3'
import errSound from '../../assets/sound/err_sound.wav'
import { utilService } from "../services/utils.service"

const SHOW_COLOR_TIME: number = 500
const simonColors: string[] = ['red', 'green', 'yellow', 'blue']
const simonSoundMap: { [key: string]: HTMLAudioElement } = {
    green: new Audio(sound1),
    red: new Audio(sound2),
    yellow: new Audio(sound3),
    blue: new Audio(sound4),
}
interface IProps {
    gameState: IState['gameState'],
    setGameState: React.Dispatch<React.SetStateAction<IState['gameState']>>
    onLose: () => void
}

export default function BoardGame({ gameState, onLose, setGameState }: IProps) {

    const [simonOrder, setSimonOrder] = useState<string[]>([])
    const [userOrder, setUserOrder] = useState<string[]>([])
    const [isUserTrun, setIsUserTurn] = useState<boolean>(false)

    const gameBoardRef = useRef() as RefObject<HTMLDivElement>
    const colorTimeoutId = useRef<any>(null)

    useEffect(() => {
        if (gameState.isOn && gameState.score === 0) {
            newGame()
        }
    }, [gameState])

    useEffect(() => {
        palySimonOrder()
    }, [simonOrder])

    useEffect(() => {

        console.log(userOrder.at(-1), isUserTrun);
        if (!isUserTrun || !userOrder.at(-1)) return

        if (simonOrder[userOrder.length - 1] !== userOrder.at(-1)) {
            // Lose
            new Audio(errSound).play()
            return onLose()
        } else {
            // Correct
            playSound(userOrder.at(-1))
        }

        if (userOrder.length === simonOrder.length) {
            nextSimonTurn()
        }
    }, [userOrder])

    function newGame() {
        setSimonOrder([])
        setUserOrder([])
        setIsUserTurn(false)
        simonTurn()

    }

    async function nextSimonTurn() {
        setUserOrder([])
        setIsUserTurn(false)
        simonTurn()
        setGameState(prevGameState => ({ ...prevGameState, score: prevGameState.score + 1 }))
    }

    async function simonTurn() {
        await utilService.wait(SHOW_COLOR_TIME * 2)
        const simonChosenColor = utilService.getRandomItemFromArray(simonColors)

        // this will trigger useEffect which will palySimonOrder()
        setSimonOrder(prevSimonOrder => [...prevSimonOrder, simonChosenColor])
    }

    async function palySimonOrder() {
        for (const color of simonOrder) {
            gameBoardRef.current?.classList.add(color)
            simonSoundMap[color].play()
            await utilService.wait(SHOW_COLOR_TIME)
            gameBoardRef.current?.classList.remove(color)
            await utilService.wait(SHOW_COLOR_TIME - 300)
        }
        setIsUserTurn(true)
    }

    function playSound(clickedColor: any): void {
        const audio = simonSoundMap[clickedColor]
        audio.pause()
        audio.currentTime = 0
        audio.play()
    }

    function onSimonButton(ev: React.MouseEvent<HTMLDivElement>) {
        const elTarget = ev.target as HTMLDivElement
        if (!elTarget.classList.contains('board-btns') || !isUserTrun) return

        const clickedColor: string = elTarget.classList[elTarget.classList.length - 1]

        if (gameBoardRef.current?.classList.contains(clickedColor)) {
            clearTimeout(colorTimeoutId.current)
        } else {
            gameBoardRef.current?.classList.remove('green', 'blue', 'yellow', 'red')
            gameBoardRef.current?.classList.add(clickedColor)
        }

        colorTimeoutId.current = setTimeout(() => {
            gameBoardRef.current?.classList.remove(clickedColor)
        }, SHOW_COLOR_TIME)

        setUserOrder(prevUserOrder => [...prevUserOrder, clickedColor])
    }


    return (
        <section className="board-game" ref={gameBoardRef}>
            <section className="btns" onClick={onSimonButton}>
                <button className="board-btns red"></button>
                <button className="board-btns yellow"></button>
                <button className="board-btns green"></button>
                <button className="board-btns blue"></button>
                <div className="score">{gameState.score}</div>
            </section>
        </section>
    )
}