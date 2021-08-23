import { Form, Input, Modal } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider';
import { addDocument } from '../../firebae/firestore';

export default function AddRoom() {

    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
    const { user: { uid } } = useContext(AuthContext)


    const [form] = Form.useForm();

    const handleOk = () => {
        //add  new room
        console.log({ formData: form.getFieldsValue() })
        setIsAddRoomVisible(false)
        addDocument('rooms', { ...form.getFieldsValue(), members: [uid] })

        // rs form modal
        form.resetFields()

    }
    const handleCancel = () => {
        form.resetFields()
        setIsAddRoomVisible(false)
    }
    return (
        <>
            <div>
                <Modal
                    title='Tạo Phòng'
                    visible={isAddRoomVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form}>
                        <Form.Item label='Tên phòng' name='name'>
                            <Input placeholder='Nhập Tên Phòng' />
                        </Form.Item>
                        <Form.Item label='Nội Dung : ' name='description'>
                            <Input.TextArea placeholder='Nhập Mô Tả' />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    )
}
