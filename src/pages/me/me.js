import {Button, Form, Input, Toast} from "antd-mobile";
import './index.scss'
import {useEffect, useState} from "react";
import {fetchGet} from "../../utils/fetch";
import {
    getUserInfoFromLocalStorage,
    loginOutFromLocalStorage,
    setUserInfoToLocalStorage
} from "../../utils/userInfoUtils";

export const Me = (props) => {

    useEffect(() => {
        let result = getUserInfoFromLocalStorage()
        setUserInfo(result)
        setLoadingUserInfo(false)
    }, [])

    const [loading, setLoading] = useState(false)
    //加载本地的userInfo
    const [loadingUserInfo, setLoadingUserInfo] = useState(true)

    const [userInfo, setUserInfo] = useState(null)

    const loginOut = () => {
        loginOutFromLocalStorage()
        setUserInfo(null)
    }

    const onFinish = async (values) => {

        setLoading(true)
        let response = await fetchGet('/release/mongoDB?methodName=itemList_checkUser',
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
        if (response.body && response.body.user) {
            Toast.show({
                content: '登录成功',
                position: 'bottom',
            })
            //将用户信息存在 localStorage
            setUserInfoToLocalStorage(values, response.body.user)
            setUserInfo(response.body.user)
        } else {
            Toast.show({
                content: '账号密码错误',
                position: 'bottom',
            })
        }
        // Toast.show(JSON.stringify(response))
        console.log('onFinish', response)
    }

    //如果在加载本地的userInfo
    if (loadingUserInfo) {
        return <div></div>
    }
    //判断是否登录
    let isLogin = false
    if (userInfo) {
        return (
            <div className='me'>
                <div className='userInfo-username'>{userInfo.username}</div>

                <Button block color='primary' size='large' onClick={loginOut}>
                    退出登录
                </Button>
            </div>)
    } else {
        return (
            <div className='me'>
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