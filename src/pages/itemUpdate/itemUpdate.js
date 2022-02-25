import {Button, Form, Space, Toast} from "antd-mobile";
import {AutoComplete, Input} from "antd";
import {useEffect, useState} from "react";
import './index.scss'
import {fetchGet} from "../../utils/fetch";

export const ItemUpdate = (props) => {

    const [deleteLoading, setDeleteLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(props.name)
    const [position, setPosition] = useState(props.position)
    const [category, setCategory] = useState(props.category)
    const [count, setCount] = useState(props.count)
    const [itemId, setItemId] = useState(props._id)

    useEffect(() => {
        setName(props.name)
        setPosition(props.position)
        setCategory(props.category)
        setCount(props.count)
        setItemId(props._id)
    }, [props])



    const onFinish = () => {

    }

    const deleteItem = async () => {
        setDeleteLoading(true)
        let values = {
            _id: itemId
        }
        console.log('deleteItem', values)
        let response = await fetchGet('/release/mongoDB?methodName=itemList_delete',
            {
                params: values
            })
        setDeleteLoading(false)
        if (response.status === 110) {
            console.log(response)
            Toast.show({
                content: response.statusText,
                position: 'bottom',
            })
            return
        }

        if (response.body && response.body.delete) {
            Toast.show({
                content: '删除成功',
                position: 'bottom',
            })
            // window.location.href = '/';
        } else {
            Toast.show({
                content: response.statusText,
                position: 'bottom',
            })
        }

    }


    console.log(props.name)

    return (
        <div>
            <div className='item-update'>
                {/*<Form
                    onFinish={onFinish}
                    footer={
                        <Button block type='submit' color='primary' size='large' loading={loading}>
                            修改
                        </Button>
                    }
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
                               // ref={itemNameInputRef}
                               value={props.name}
                        />
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
                            defaultValue={props.position}
                            // options={positionList}
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
                            defaultValue={props.category}
                            // options={categoryList}
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
                            defaultValue={props.count}
                            size="large"
                        />
                    </Form.Item>
                </Form>*/}
                <div className='item'>
                    <div className="item-label">物品名称</div>
                    <Input placeholder='请输入物品名称'
                           bordered={false}
                           size='large'
                           allowClear={true}
                        // ref={itemNameInputRef}
                           value={name}
                           onChange={e => {
                               setName(e.target.value)
                           }}
                    />
                </div>
                <div className='item'>
                    <div className="item-label">存储位置</div>
                    <Input placeholder='请输入存储位置'
                           bordered={false}
                           size='large'
                           allowClear={true}
                        // ref={itemNameInputRef}
                           value={position}
                           onChange={e => {
                               setPosition(e.target.value)
                           }}
                    />
                </div>
                <div className='item'>
                    <div className="item-label">物品分类</div>
                    <Input placeholder='请输入物品分类'
                           bordered={false}
                           size='large'
                           allowClear={true}
                        // ref={itemNameInputRef}
                           value={category}
                           onChange={e => {
                               setCategory(e.target.value)
                           }}
                    />
                </div>
                <div className='item'>
                    <div className="item-label">物品数量</div>
                    <Input placeholder='请输入物品数量'
                           bordered={false}
                           size='large'
                           allowClear={true}
                        // ref={itemNameInputRef}
                           value={count}
                           onChange={e => {
                               setCount(e.target.value)
                           }}
                    />
                </div>
                <div className='btn-div'>
                    <Space>
                        <Button color='danger' onClick={deleteItem} loading={deleteLoading}>删除</Button>
                        <Button color='primary'>修改</Button>
                    </Space>
                </div>

                {/*<div className='item'>
                    <div className="item-label">存储位置</div>
                    <Input placeholder='请输入存储位置'
                           bordered={false}
                           size='large'
                           allowClear={true}
                        // ref={itemNameInputRef}
                           value={props.position}
                    />
                </div>*/}

            </div>
        </div>)
}