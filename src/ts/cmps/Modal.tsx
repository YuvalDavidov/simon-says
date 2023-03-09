interface IProps {
    isIntroModalOpen: boolean,
    onToggleModal: () => void
}

export default function Modal({ isIntroModalOpen, onToggleModal }: IProps) {

    return (
        <article className={`modal ${isIntroModalOpen ? '' : 'close'}`}>
            <h1>Simons Says!</h1>

            <h3>👋 introduction</h3>
            <p>Welcome to the Simon says game!</p>

            <h3>🎯 Objectives</h3>
            <p>Repeat the sequence of colors in the correct order.</p>

            <h3>🎮 How to play</h3>
            <p>Watch the sequence of colors, then click on the same colors in the same order.</p>

            <h3>🥇 Scoring</h3>
            <p>Game keeps track of successful rounds. Try to beat your high score.</p>

            <h3>🏆 Good Luck!</h3>
            <p>Have fun!</p>

            <button onClick={onToggleModal} className="modal-btn">Let's Go!</button>
        </article>
    )
}