import React, { useContext } from 'react'
import { Collapse, Typography, Button } from 'antd'
import styled from 'styled-components'
import { PlusSquareOutlined } from '@ant-design/icons'
import { AppContext } from '../../context/AppProvider';



const { Panel } = Collapse

const PanelStyled = styled(Panel)`
    &&&{
        .ant-collapse-header,p{
            color:white;
        }
        .ant-collapae-content-box{
            padding: 0 , 40px;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display:block;
    margin-bottom: 5px;
    color:white;
`;


export default function Roomlist() {

    const { rooms, setIsAddRoomVisible , setSelectedRoomId} = useContext(AppContext)
    const handleAddRoom = () => {
        setIsAddRoomVisible(true)
    }

    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Danh Sách Phòng" key='1'>
                {
                    rooms.map(room => <LinkStyled onClick={() => setSelectedRoomId(room.id)} key={room.id}>{room.name}</LinkStyled>)
                }
                <Button type='text' icon={<PlusSquareOutlined />} onClick={handleAddRoom} className='add-room'>Thêm Phòng</Button>
            </PanelStyled>
        </Collapse >
    )
}
