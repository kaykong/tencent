import './index.scss'
import {List, SearchBar} from "antd-mobile";
import {Icon} from "../../components/icon/icon";

const ItemList = (props) => {

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