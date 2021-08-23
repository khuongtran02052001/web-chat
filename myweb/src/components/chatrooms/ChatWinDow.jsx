import React from 'react'
import { Col, Row } from 'antd'
import Slidebar from './Slidebar'
import ChatRoom from './ChatRoom'
export default function ChatWinDow() {
    return (
        <div>
            <Row>
                <Col span={6}>
                    <Slidebar />
                </Col>
                <Col span={18}>
                    <ChatRoom />
                </Col>
            </Row>
        </div>
    )
}
