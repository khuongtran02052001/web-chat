import { UserAddOutlined } from '@ant-design/icons';
import { Button, Avatar, Tooltip, Input, Form, Alert } from 'antd';
import { formatRelative } from 'date-fns';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components'
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { addDocument } from '../../firebae/firestore';
import useFirestore from '../../hooks/useFirestore';
import Message from './Message';


const HeaderStyle = styled.div`
    display:flex;
    justify-content:space-between;
    height:56px;
    padding: 0 16px;
    border-bottom: 1px solid rgba(230, 230, 230);

    .header{
        &__info{
            display: flex;
            flex-direction: column;
            justify-content:center;
        }

        &__title{
            margin: 0;
            font-weight:bold;
        }
        &__description{
            font-size:12px;
        }
    }
`;
const ButtonGroupStyle = styled.div`
display: flex;
align-items:center;
`;

const ContentStyle = styled.div`
height: calc(100% - 56px);
display:flex;
flex-direction: column;
padding: 11px;
justify-content: flex-end;
`;

const MessageListStyled = styled.div`
max-height:100%;
overflow-y: auto;
`;

const WrapperStyled = styled.div`
height:100vh;
`;


const FormStyled = styled(Form)`
    display:flex;
    justify-content:space-between;
    align-items: center;
    padding: 2px 2px 2px 0px;
    border: 1px solid rgb(230,230,230);
    border-radius:2px;

    .ant-form-item{
        flex:1;
        margin-bottom:0;
    }
`;

const ChatRoom = () => {
    const { user: {
        uid, photoURL, displayName
    } } = useContext(AuthContext)
    const { selectedRoom, members, setIsInvite } = useContext(AppContext)
    const [inputValue, setInputValue] = useState('')
    const [form] = Form.useForm()

    const handleSubmit = () => {
        addDocument('message', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        })
        form.resetFields(['message'])
    }

    const messageCondition = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }, [selectedRoom.id]))

    const message = useFirestore('message')

    const handleOnChage = (e) => {
        setInputValue(e.target.value)
    }


    return (
        <WrapperStyled>
            {
                selectedRoom.id ? (<>
                    <HeaderStyle>
                        <div className='header__info'>
                            <p className='header__title'>{selectedRoom.name}</p>
                            <span className='header__description'>{selectedRoom.description} </span>
                        </div>
                        <ButtonGroupStyle>
                            <div>
                                <Button icon={<UserAddOutlined />} onClick={() => setIsInvite(true)} type='text'>Mời</Button>
                                <Avatar.Group size='small' maxCount={3}>
                                    {members.map(member => <Tooltip title={member.displayName} key={member.id}>
                                        <Avatar src={member.photoURL}>
                                            {member.photoURL ? '' : member.displayName?.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </Tooltip>)}
                                </Avatar.Group>
                            </div>
                        </ButtonGroupStyle>
                    </HeaderStyle>
                    <ContentStyle>
                        <MessageListStyled>
                            {
                                message.map(mes => <Message key={mes.id} text={mes.text} photoURL={mes.photoURL} displayName={mes.displayName} createdAt={mes.createdAt}></Message>)
                            }

                        </MessageListStyled>
                        <FormStyled form={form}>
                            <Form.Item name='message'>
                                <Input onChange={handleOnChage} onPressEnter={handleSubmit} placeholder="nhập tin nhắn" bordered={false} autoComplete='off' />
                            </Form.Item>
                            <Button type="primary" onClick={handleSubmit} >Gửi</Button>
                        </FormStyled>
                    </ContentStyle>
                </>) : <Alert message="Hãy Chọn Phòng " type='info' showIcon style={{ margin: '5px' }} closable />
            }

        </WrapperStyled>
    )
}

export default ChatRoom
