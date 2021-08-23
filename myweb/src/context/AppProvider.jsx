import React, { useMemo, useState } from "react"
import useFirestore from "../hooks/useFirestore"
import { AuthContext } from "./AuthProvider"

export const AppContext = React.createContext()
export default function AppProvider({ children }) {


    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [isInvite, setIsInvite] = useState(false)

    const [selectedRoomId, setSelectedRoomId] = useState('')



    const { user: { uid } } = React.useContext(AuthContext)

    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])




    const rooms = useFirestore('rooms', roomsCondition)
    console.log({ rooms })

    const selectedRoom = useMemo(() => rooms.find((room) => room.id === selectedRoomId) || {}, [rooms, selectedRoomId])


    const userCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        }
    }, [selectedRoom.members])

    const members = useFirestore('user', userCondition)
    console.log({ members, setlectedMember: selectedRoom.members })
    return (
        <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId, selectedRoom, members, isInvite, setIsInvite }}>
            {children}
        </AppContext.Provider>
    )
}