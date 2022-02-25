import {TabBar} from "antd-mobile";
import {useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Icon} from "../icon/icon";
import './index.scss'

const Bottom = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {pathname} = location

    //页面最初实际的高度
    const [clientHeight, setClientHeight] = useState(null)
    //页面变化后的高度
    const [showHeight, setShowHeight] = useState(null)

    useEffect(() => {
        //第一次加载底部导航, 获取页面的最初实际高度, 设置clientHeight的值
        setClientHeight(document.documentElement.clientHeight)
        setShowHeight(document.documentElement.clientHeight)

        window.onresize = () => {
            //如果输入框在页面下面的位置，键盘弹起后，会遮挡住要输入的区域，只有开始输入的时候才会滚动到输入的位置，用户体验非常不好。
            /*if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }*/

            return (() => {
                //页面高度变化后, 设置showHeight的值
                setShowHeight(document.body.clientHeight)
            })()
        }

        return () => {
            window.onresize = () => {
            }
        }
    }, [])

    const setRouteActive = (value) => {
        navigate(value)
    }

    const tabs = [
        {
            key: '/item-list',
            title: '首页',
            // icon: <AppOutline />,
            icon: <Icon name='shouye' />
        },
        {
            key: '/item-add',
            title: '添加物品',
            icon: <Icon name='jia'/>
        },
        /*{
            key: '/item-add2',
            title: '添加物品2',
            icon: <Icon name='jia'/>
        },*/
        /*{
            key: '/message',
            title: '我的消息',
            // icon: <MessageOutline />,
        },*/
        {
            key: '/me',
            title: '个人中心',
            // icon: <UserOutline />,
            icon: <Icon name='wode'/>
        },
    ]

    if (showHeight && clientHeight && showHeight < (clientHeight - 10)) {
        //如果页面变化后的高度 小于 最初的高度, 那么返回一个空页面
        return <div></div>
    }

    return (
        <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
        </TabBar>
    )
}

export default Bottom