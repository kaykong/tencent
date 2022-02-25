import {Button, Form, Toast, } from "antd-mobile";

import {fetchGet} from "../../utils/fetch";
import {getUserInfoFromLocalStorage, setUserInfoToLocalStorage} from "../../utils/userInfoUtils";
import {useEffect, useRef, useState} from "react";
import './index.scss'
import {Select, Input, AutoComplete} from 'antd';

const { Option } = Select;

const ItemAdd = () => {

    const [loading, setLoading] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [positionList, setPositionList] = useState([])

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

        if (!values.name) {
            Toast.show({
                content: '请输入物品名称',
                position: 'bottom',
            })
            return
        }

        if (!values.position) {
            Toast.show({
                content: '请输入存储位置',
                position: 'bottom',
            })
            return
        }

        if (!values.category) {
            Toast.show({
                content: '请输入物品分类',
                position: 'bottom',
            })
            return
        }

        if (!values.count) {
            Toast.show({
                content: '请输入物品数量',
                position: 'bottom',
            })
            return
        }

        values.userId = userInfo._id

        // itemNameInputRef.current.clear()
        // itemNameInputRef.current.setValue('')



        setLoading(true)
        values.create_time = Date.now()
        values.update_time = values.create_time
        console.log('onFinish', values)
        // return
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
            // itemNameInputRef.current.input.value = ''
            // itemNameInputRef.current.value = ''
            getItemCategory(userInfo._id)
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

    const getItemCategory = async (userId) => {
        let response = await fetchGet(`/release/mongoDB?methodName=itemList_getItemDistinctKey&key=category&userId=${userId}`)
        if (response.body && response.body.list && response.body.list.length > 0) {
            let result = response.body.list.map(item => {
                return {value: item}
            })
            setCategoryList(result)
        }

        console.log('getItemCategory', response)
    }

    const getItemPosition = async (userId) => {
        let response = await fetchGet(`/release/mongoDB?methodName=itemList_getItemDistinctKey&key=position&userId=${userId}`)
        if (response.body && response.body.list && response.body.list.length > 0) {
            let result = response.body.list.map(item => {
                return {value: item}
            })
            setPositionList(result)
        }

        console.log('getItemPosition', response)
    }

    useEffect(() => {
        let userInfo = getUserInfoFromLocalStorage()
        console.log('userInfo', userInfo)
        if (userInfo) {
            getItemCategory(userInfo._id)
            getItemPosition(userInfo._id)
        }

    }, [])

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
                    <AutoComplete
                        style={{ width: '100%' }}
                        placeholder="请输入存储位置"
                        bordered={false}
                        allowClear={true}
                        size="large"
                        options={positionList}
                    />
                </Form.Item>

                <Form.Item
                    name='category'
                    label='物品分类'
                >
                    <AutoComplete
                        style={{ width: '100%' }}
                        placeholder="请输入物品分类"
                        bordered={false}
                        allowClear={true}
                        size="large"
                        options={categoryList}
                    />
                </Form.Item>
                <Form.Item
                    name='count'
                    label='物品数量'
                >
                    <Input
                        style={{ width: '100%' }}
                        placeholder="请输入物品数量"
                        allowClear={true}
                        bordered={false}
                        size="large"
                    />
                </Form.Item>
            </Form>
        </div>)
}

export default ItemAdd