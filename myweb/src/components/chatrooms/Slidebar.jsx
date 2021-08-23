import React from 'react'
import { Col, Row } from 'antd'
import Userinfo from './Userinfo'
import Roomlist from './Roomlist'
import styled from 'styled-components'


const SlidebarStyled = styled.div`
    background: #9e82df;
    color : white;
    height : 100vh;
`

export default function Slidebar() {



    return (
        <SlidebarStyled>
            <Row>
                <Col span={24}>
                    <Userinfo />
                </Col>
                <Col span={24}>
                    <Roomlist />
                </Col>
            </Row>
        </SlidebarStyled>
    )
}
