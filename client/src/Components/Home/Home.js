import React from 'react'
import { useNavigate } from "react-router-dom"

import { Card } from "../../Shared Components/Card/Card"
import { Button } from "../../Shared Components/Button/Button"

import styles from "./Home.module.css"

export const Home = () => {

    const navigate = useNavigate();

    const startRegister = () => {
        navigate('/authenticate');
    }

    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to virtual meet">
                <p className={styles.text}>
                    Want to Connect with your Friend or want to attend an official virtual meeting. Go Ahead!!
                </p>
                <div>
                    <Button onClick={startRegister} text="Let's get started" />
                </div>
            </Card>
        </div>
    )
}
