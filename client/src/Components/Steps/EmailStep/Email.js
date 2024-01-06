import React, { useState } from 'react'
import styles from "./Email.module.css"

import { Card } from "../../../Shared Components/Card/Card"
import { Button } from "../../../Shared Components/Button/Button"
import { TextInput } from '../../../Shared Components/TextInput/TextInput'
import { sendOtp } from '../../../http/Http'
import { useDispatch } from "react-redux"
import { SendOtp } from '../../../Store/AuthSlice'

export const Email = (props) => {

    const [email, setEmail] = useState('')
    const dispatch = useDispatch();

    const send = async () => {
        if (!email) return;
        const { data } = await sendOtp({ email: email })
        dispatch(SendOtp({ email: data.email, hash: data.hash }))
        console.log(data)
        props.onClick()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            send();
        }
    }

    return (
        <div className={styles.cardWrapper}>
            <Card title="Enter you Email Id" icon="email">
                <TextInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div>
                    <div className={styles.actionButtonWrap}>
                        <Button text="Next" onClick={send} />
                    </div>
                </div>
            </Card>
        </div>
    )
}
