import { Typography, Avatar } from 'antd'
import { formatRelative } from 'date-fns/esm';
import React from 'react'
import styled from 'styled-components'


const WrapperStypled = styled.div`
    margin-bottom:10px;
    .Author{
        margin-left:5px;
        font-weight: bold;
    };
    .Date{
        margin-left:10px;
        font-size:11px;
        color:#a7a7a7;
    }
    .Content{
        margin-left: 30px;
    }
`;
function formatDate(seconds) {
    let formattedDate = '';

    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date())

        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    }
    return formatDate
}

export default function Message({ text, displayName, createdAt, photoURL }) {
    return (
        <WrapperStypled>
            <div>
                <Avatar size='small' src={photoURL}>
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className='Author'>{displayName}</Typography.Text>
                <Typography.Text className='Date'>{formatDate(createdAt?.seconds)}</Typography.Text>
            </div>
            <div>
                <Typography.Text className='Content'>{text}</Typography.Text>
            </div>
        </WrapperStypled>
    )
}
