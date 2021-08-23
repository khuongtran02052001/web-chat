import React from 'react'
import { Row, Col, Button, Typography } from 'antd'
import firebase, { auth, db } from '../../firebae/config';
import { useHistory } from 'react-router-dom'
import { addDocument, generateKeywords } from '../../firebae/firestore';
const { Title } = Typography
const fbProvider = new firebase.auth.FacebookAuthProvider()

export function Login() {


    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await firebase.auth().signInWithPopup(fbProvider)

        addDocument('user', {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId,
            keywords:generateKeywords(user.displayName)
        })
    }


    return (
        <>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8} >
                    <Title style={{ textAlign: 'center' }} Level={3}>WEB CHAT</Title>
                    <Button style={{ width: '100%', marginBottom: 5 }}>
                        LOGIN WITH GOOGLE
                    </Button>
                    <Button style={{ width: '100%' }} onClick={handleFbLogin}>
                        LOGIN WITH FACEBOOK
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default Login