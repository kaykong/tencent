import './index.scss'
import {List, SearchBar} from "antd-mobile";
import {Icon} from "../../components/icon/icon";
import {useEffect} from "react";
import {fetchGet} from "../../utils/fetch";


const ItemList = (props) => {

    useEffect(() => {
        console.log(1)
        // fetchGet('/release/mongoDB?methodName=getMessageByPage&pageNum=1&limitNum=20')
        getList()
        console.log(2)
    }, [])

    const getList = async () => {
        // let response = await fetchGet('/release/mongoDB?methodName=getMessageByPage&pageNum=1&limitNum=20')
        let response = await fetchGet('/release/mongoDB?methodName=itemList_checkUser&password=188002095220&phone=18800209520')
        console.log(3)
        console.log(response)
        return response
    }

    return (
        <div className='item-list-wrapper'>
            <div className="search-input-wrapper ">
                <SearchBar className='search-input'/>
            </div>
            <div className="list-wrapper">
                <List header='物品清单'>
                    <List.Item prefix={<Icon name='notebook'/>} description='电视柜左2' onClick={() => {}}>
                        一本书
                    </List.Item>
                    <List.Item prefix={<Icon name='camera'/>} description='电视柜右1' onClick={() => {}}>
                        相机
                    </List.Item>
                    <List.Item prefix={<Icon name='Thermometer'/>} description='床头柜左2' onClick={() => {}}>
                        温度计
                    </List.Item>
                    <List.Item prefix={<Icon name='notebook'/>} description='电视柜左2' onClick={() => {}}>
                        一本书
                    </List.Item>
                    <List.Item prefix={<Icon name='camera'/>} description='电视柜右1' onClick={() => {}}>
                        相机
                    </List.Item>
                    <List.Item prefix={<Icon name='Thermometer'/>} description='床头柜左2' onClick={() => {}}>
                        温度计
                    </List.Item>
                    <List.Item prefix={<Icon name='notebook'/>} description='电视柜左2' onClick={() => {}}>
                        一本书
                    </List.Item>
                    <List.Item prefix={<Icon name='camera'/>} description='电视柜右1' onClick={() => {}}>
                        相机
                    </List.Item>
                    <List.Item prefix={<Icon name='Thermometer'/>} description='床头柜左2' onClick={() => {}}>
                        温度计
                    </List.Item>
                    <List.Item prefix={<Icon name='notebook'/>} description='电视柜左2' onClick={() => {}}>
                        一本书
                    </List.Item>
                    <List.Item prefix={<Icon name='camera'/>} description='电视柜右1' onClick={() => {}}>
                        相机
                    </List.Item>
                    <List.Item prefix={<Icon name='Thermometer'/>} description='床头柜左2' onClick={() => {}}>
                        温度计
                    </List.Item>
                </List>

            </div>
        </div>
    )


}

export default ItemList