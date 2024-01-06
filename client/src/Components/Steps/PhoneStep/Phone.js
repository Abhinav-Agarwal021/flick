import React, { useState } from 'react'
import styles from "./Phone.module.css"

import { Card } from "../../../Shared Components/Card/Card"
import { Button } from "../../../Shared Components/Button/Button"
import { TextInput } from '../../../Shared Components/TextInput/TextInput'
import { useDispatch, useSelector } from "react-redux"
import { setPhone } from '../../../Store/userDetails'

export const Phone = (props) => {

    const { phone } = useSelector((state) => state.details)
    const [phoneNumber, setPhoneNumber] = useState(phone)
    const dispatch = useDispatch();

    const send = async () => {
        if (!phoneNumber) return;
        dispatch(setPhone(phoneNumber))
        props.onClick()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            send();
        }
    }

    return (
        <div className={styles.cardWrapper}>
            <Card title="Enter you phone number" icon="phone">
                <TextInput
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
