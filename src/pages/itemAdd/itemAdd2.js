import {Button, Form, Toast, Input} from "antd-mobile";

import {fetchGet} from "../../utils/fetch";
import {getUserInfoFromLocalStorage, setUserInfoToLocalStorage} from "../../utils/userInfoUtils";
import {useRef, useState} from "react";
import './index.scss'
import {InputSearch} from "./inputSearch";


const ItemAdd2 = () => {

    const [loading, setLoading] = useState(false)
    const [itemName, setItemName] = useState('')

    const itemNameInputRef = useRef();

    const onFinish = async (values) => {
        let userInfo = getUserInfoFromLocalStorage()
        if (!userInfo) {
            Toast.show({
                content: '请先登录',
                position: 'bottom',
            })
            return
        }

        values.userId = userInfo._id

        console.log('onFinish', values)
        // itemNameInputRef.current.clear()
        // itemNameInputRef.current.setValue('')
        console.log('itemNameInputRef.current', itemNameInputRef.current)
        itemNameInputRef.current.input.value = ''
        setItemName('')
        return


        setLoading(true)
        let response = await fetchGet('/release/mongoDB?methodName=itemList_add',
            {
                params: values
            })
        setLoading(false)
        if (response.status === 110) {
            console.log(response)

            Toast.show({
                content: response.statusText,
                position: 'bottom',
            })
            return
        }

        if (response.body && response.body.item) {
            Toast.show({
                content: '添加成功',
                position: 'bottom',
            })

        } else {
            Toast.show({
                content: response.statusText,
                position: 'bottom',
            })
        }

        console.log('onFinish', values)
    }

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    return (
        <div className='item-add'>
            <Form
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='large' loading={loading}>
                        添加
                    </Button>
                }
                initialValues={{count: 1, category: '其他'}}
            >
                <Form.Header>添加物品</Form.Header>
                <Form.Item
                    name='name'
                    label='物品名称'
                >
                    <Input placeholder='请输入物品名称'
                           bordered={false}
                           size='large'
                           allowClear={true}
                           ref={itemNameInputRef}/>
                </Form.Item>
                <Form.Item
                    name='position'
                    label='存储位置'
                >
                    <InputSearch placeholder='ceshi'/>
                </Form.Item>

                <Form.Item
                    name='category'
                    label='物品分类'
                >
                    <Input onChange={console.log} placeholder='请输入物品名称'/>
                </Form.Item>
                <Form.Item
                    name='count'
                    label='物品数量'
                >
                    <Input onChange={console.log} placeholder='请输入物品名称'/>
                </Form.Item>
            </Form>
        </div>)
}

export default ItemAdd2