import React, { useState, useEffect } from 'react'
import styles from "./Rooms.module.css"
import { RoomCard } from '../../Shared Components/RoomCard/RoomCard';
import { AddRooms } from '../Add_rooms/AddRooms';
import { checkCList, getCs, getRId, getRs, getUsBD, sendCList } from '../../http/Http';
import { Loader } from "../../Shared Components/Loader/Loader"
import { useSelector } from 'react-redux';

import { MdKeyboardBackspace } from "react-icons/md";

import { useNavigate } from 'react-router-dom';

export const Rooms = (props) => {

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    const [showModal, setShowModal] = useState(false)
    const [searchEmail, setSearchEmail] = useState('')
    const [room, setRoom] = useState([])
    const [conversation, setConversation] = useState([])
    const [loading, setLoading] = useState(false)

    const openModal = () => {
        setShowModal(true);
    }

    const handleSearch = async () => {

        if (!searchEmail) return;

        if (searchEmail !== user.email) {
            const friend = await getUsBD(searchEmail);
            const check = await checkCList({ senderId: user.id, receiverId: friend.data._id });
            setSearchEmail('')
            if (!check.data) {
                try {
                    const conv = await sendCList({ senderId: user.id, receiverId: friend.data._id });
                    navigate(`/chat/${conv.data.id}`)
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                navigate(`/chat/${check.data[0]._id}`)
            }
        }
        else {
            console.log("please enter another number")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleOpenChat = (id) => {
        setLoading(true);
        try {
            navigate(`/chat/${id}`)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleOpenRoom = async (id) => {
        setLoading(true);
        try {
            const res = await getRId(id);
            if (res.data.dm) {
                navigate(`/dms`)
            }
            else {
                navigate(`/grp/${id}`)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const fetchRooms = async () => {
            if (!props.dm) {
                setLoading(true);
                try {
                    const rooms = await getRs(user.id)
                    setRoom(rooms.data)
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchRooms();

    }, [user, props])

    useEffect(() => {

        const fetchConversations = async () => {
            setLoading(true);
            try {
                const conversations = await getCs(user.id)
                setConversation(conversations.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchConversations();

    }, [user, props])

    const handleBack = () => {
        navigate(-1);
    }

    if (loading) return <Loader message="Loading! please wait....." />
    return (
        <>
            <div className="container">
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.go__back} onClick={handleBack} >
                            <MdKeyboardBackspace className={styles.go__back__icon} />
                        </span>
                        <span className={styles.heading}>
                            {props.dm ? "Direct Messages" : "Rooms"}
                        </span>
                        <div className={styles.searchBox}>
                            <input type="text" value={searchEmail} placeholder='Find or start a conversation for Dms' className={styles.searchInput} onChange={(e) => setSearchEmail(e.target.value)} onKeyDown={handleKeyDown} />
                            <img src="/images/search-icon.png" alt="search" onClick={handleSearch} />
                        </div>
                    </div>
                    {!props.dm &&
                        <div className={styles.right}>
                            <button onClick={openModal} className={styles.startRoomButton}>
                                <img
                                    src="/images/add-room-icon.png"
                                    alt="add-room"
                                />
                                <span>Add a server</span>
                            </button>
                        </div>
                    }
                </div>

                <div className={styles.roomList}>
                    {!props.dm && room.map((room, idx) => (
                        <RoomCard key={idx} room={room} dmConv={conversation} onClick={() => handleOpenRoom(room.id)} />
                    ))}
                    {props.dm && conversation.map((conv, index) => (
                        <RoomCard key={index} conv={conv} onClick={() => handleOpenChat(conv._id)} />
                    ))}
                </div>
            </div>
            {showModal && <AddRooms field="Add a server" options onClose={() => setShowModal(false)} />}
        </>
    )
}
