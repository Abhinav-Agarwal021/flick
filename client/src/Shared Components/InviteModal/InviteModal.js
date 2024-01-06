import React, { useState } from 'react'
import { checkCList, getUsBD, sendCList, sendCodeEmail, sendMssgs } from '../../http/Http'
import styles from './InviteModal.module.css'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

export const InviteModal = (props) => {

    const navigate = useNavigate();

    const [searchEmail, setSearchEmail] = useState('')
    const [clicked, setClicked] = useState(false)
    const [sent, setSent] = useState(false)

    const { user } = useSelector((state) => state.user);

    const copyLink = () => {
        setClicked(true)
        navigator.clipboard.writeText(props.codeData.code)
        setTimeout(() => {
            setClicked(false)
        }, 1000);
    }
    const sendLink = async (e) => {
        e.preventDefault();
        setSent(true)

        setTimeout(() => {
            setSent(false)
        }, 1000);

        if (!searchEmail) return;

        if (searchEmail !== user.email) {
            const friend = await getUsBD(searchEmail);
            const check = await checkCList({ senderId: user.id, receiverId: friend.data._id });
            console.log(check)
            setSearchEmail('')
            if (!check.data) {
                try {
                    const conv = await sendCList({ senderId: user.id, receiverId: friend.data._id });
                    const userCs = {
                        sender: user.id,
                        message: `you can join my server using Invite code : ${props.codeData.code}`,
                        conversationId: conv.data.id
                    }

                    try {
                        await sendMssgs(userCs);
                    } catch (error) {
                        console.log("message not sent")
                    }
                    navigate(`/chat/${conv.data.id}`)
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                const userCs = {
                    sender: user.id,
                    message: `you can join my server using Invite code : ${props.codeData.code}`,
                    conversationId: check.data[0]._id
                }

                try {
                    await sendMssgs(userCs);
                } catch (error) {
                    console.log("message not sent")
                }
                navigate(`/chat/${check.data[0]._id}`)
            }
        }
        else {
            console.log("please enter another number")
        }

        props.onClose();
    }

    const sendLinkEmail = async (e) => {
        e.preventDefault();
        setSent(true)

        setTimeout(() => {
            setSent(false)
        }, 1000);

        if (!searchEmail) return;

        await sendCodeEmail({ email: searchEmail, code: props.codeData.code });

        props.onClose();
    }

    return (
        <div className={styles.modalMask}>
            <div className={styles.modalBody}>
                <button onClick={props.onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </button>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>
                        Invite friends to this server
                    </h3>
                    <div className={styles.code}>
                        <input type="text" value={searchEmail} autoFocus="autoFocus" placeholder='DM or Email code to a friend' className={styles.searchInput} onChange={(e) => setSearchEmail(e.target.value)} />
                        <div className={styles.sendBtns}>
                            <button className={`${styles.footerButton} ${sent && styles.copied}`} onClick={sendLink}>{sent ? "Sent" : "Ping"}</button>
                            <button className={`${styles.footerButton} ${sent && styles.copied}`} onClick={sendLinkEmail}>{sent ? "Sent" : "Email"}</button>
                        </div>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <h2 className={styles.copyoption}>or, send a server invite link to a friend</h2>
                    <div className={styles.codecopy}>
                        <input type="text" value={props.codeData.code} readOnly />
                        <button className={`${styles.footerButton} ${clicked && styles.copied}`} onClick={copyLink}>{clicked ? "copied" : "copy"}</button>
                    </div>
                    <h2 className={styles.validation}>Your invite code expires in 7days.</h2>
                </div>
            </div>
        </div >
    )
}
