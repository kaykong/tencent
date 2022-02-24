import {Button, Form, Input, Toast} from "antd-mobile";
import './index.scss'
import {useState} from "react";
import {fetchGet} from "../../utils/fetch";

export const Me = (props) => {

    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {

        setLoading(true)
        let response = await fetchGet('/release/mongoDB?methodName=itemList_checkUser',
            {
                params: values
            })
        setLoading(false)
        // console.log(3)
        console.log(response)
        if (response.body.user) {
            Toast.show('登录成功')
        } else {
            Toast.show('账号密码错误')
        }
        console.log('onFinish', response)
    }

    //判断是否登录
    let isLogin = false
    if (isLogin) {

    } else {
        return (<div className='me'>
            <Form
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='large' loading={loading}>
                        登录
                    </Button>
                }
            >
                <Form.Header>登录</Form.Header>
                <Form.Item
                    name='phone'
                    label='手机'
                    rules={[{required: true, message: '手机不能为空'}]}
                >
                    <Input onChange={console.log} placeholder='请输入手机' type='number'/>
                </Form.Item>
                <Form.Item
                    name='password'
                    label='密码'
                    rules={[{required: true, message: '密码不能为空'}]}
                >
                    <Input onChange={console.log} placeholder='请输入密码' type='password'/>
                </Form.Item>
            </Form>
        </div>)
    }
}