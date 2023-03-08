import { useState } from "react"
import Modal from "../cmps/Modal"



export default function SimonSays() {

    const [higthScore, setHigthScore] = useState<number>(0)
    const [introModal, setIntroModal] = useState<boolean>(true)

    return (<>
        <Modal />
        <section className="main-layout">
            index


        </section>
    </>
    )
}