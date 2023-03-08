import { useState } from "react"
import Modal from "../cmps/Modal"



export default function SimonSays() {

    const [higthScore, setHigthScore] = useState<number>(0)
    const [introModal, setIntroModal] = useState<boolean>(true)


    function onToggleModal() {
        setIntroModal(!introModal)
    }
    return (<>
        <Modal introModal={introModal} onToggleModal={onToggleModal} />
        <section className="main-layout">
            index


        </section>
    </>
    )
}