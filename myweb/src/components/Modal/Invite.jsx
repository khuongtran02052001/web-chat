import { Form, Select, Modal, Spin } from 'antd'
import Avatar from 'antd/lib/avatar/avatar';
import { debounce } from 'lodash';
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider';
import { db } from '../../firebae/config';
import { addDocument } from '../../firebae/firestore';


function DebounSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState([])



    const debounceFetcher = React.useMemo(() => {
        const loadOptions = value => {
            setOptions([])
            setFetching(true)



            // gọi api từ ngoài
            fetchOptions(value, props.currentMembers)
                .then(newOptions => {
                    setOptions(newOptions)
                    setFetching(false)
                })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions])
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {
                options.map((opt => (<Select.Option key={opt.value} value={opt.value} title={opt.label} >
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0).toUpperCase()}
                    </Avatar>
                    {`${opt.label}`}
                </Select.Option>)))
            }

        </Select>

    )
}

async function fetchUserList(search, currentMembers) {
    return db.collection('user').where('keywords', 'array-contains', search).orderBy('displayName').limit(10).get().then(snapshot => {
        return snapshot.docs.map(doc => ({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL,
        })).filter(opt => !currentMembers.includes(opt.value))
    })
}


export default function Invite() {
    const [value, setValue] = useState([])
    const { isInvite, setIsInvite, selectedRoomId, selectedRoom } = useContext(AppContext)
    const { user: { uid } } = useContext(AuthContext)


    const [form] = Form.useForm();

    const handleOk = () => {

        // rs form modal
        form.resetFields()
        //Update Phòng
        const roomRef = db.collection('rooms').doc(selectedRoomId)
        setIsInvite(false)

        roomRef.update({
            members: [...selectedRoom.members, ...value.map((val) => val.value)]

        })
    }
    const handleCancel = () => {
        form.resetFields()
        setIsInvite(false)
    }
    return (
        <>
            <div>
                <Modal
                    title='Mời Thêm Thành Viên'
                    visible={isInvite}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout='vertical'>
                        <DebounSelect
                            mode='multiple'
                            label='Tên Các Thành Viên'
                            value={value}
                            placeholder='Nhập tên bạn muốn mời vào đê'
                            fetchOptions={fetchUserList}
                            onChange={(newvalue) => setValue(newvalue)}
                            style={{ width: '100%' }}
                            currentMembers={selectedRoom.members}
                        />
                    </Form>
                </Modal>
            </div>
        </>
    )
}
