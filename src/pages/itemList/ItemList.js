import './index.scss'
import {DotLoading, InfiniteScroll, List, PullToRefresh, SearchBar, Toast} from "antd-mobile";
import {Icon} from "../../components/icon/icon";
import {useEffect, useState} from "react";
import {fetchGet} from "../../utils/fetch";
import {getUserIdFromLocalStorage} from "../../utils/userInfoUtils";


const ItemList = (props) => {

    const [itemList, setItemList] = useState([])
    const [searchInputValue, setSearchInputValue] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [loadingList, setLoadingList] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        console.log(1)
        // fetchGet('/release/mongoDB?methodName=getMessageByPage&pageNum=1&limitNum=20')
        search()
        console.log(2)
    }, [])

    const search = async (searchInput) => {

        setSearchInputValue(searchInput)
        // let response = await fetchGet('/release/mongoDB?methodName=getMessageByPage&pageNum=1&limitNum=20')
        let userId = getUserIdFromLocalStorage()
        setLoadingList(true)
        let url = `/release/mongoDB?methodName=itemList_getItemListByPage&userId=${userId}&pageNum=${0}&limitNum=${10}`
        if (searchInput && searchInput.trim()) {
            url = `/release/mongoDB?methodName=itemList_getItemListByPage&userId=${userId}&pageNum=${0}&limitNum=${10}&searchInput=${searchInput}`
        }
        setCurrentPage(0)
        setHasMore(false)

        let response = await fetchGet(url)

        if (response.body && response.body.list && response.body.list.length > 0) {
            setItemList(response.body.list)
            if (response.body.list.length >= 10) {
                setHasMore(true)
            }
        }
        if (response.body && response.body.list && response.body.list.length === 0) {
            setItemList([])
            Toast.show({
                content: `${searchInput}未搜索到`,
                position: 'bottom',
            })
        }
        setLoadingList(false)
        console.log('getList', response)
    }

    const getDesc = item => {
        return <div>
            <span>{item.position}</span>
            <span className='item-category'>{item.category}</span>
        </div>
    }
    //loadMore
    const loadMore = async item => {
        console.log('loadMore', itemList)
        if (itemList.length < 10) {
            setHasMore(false)
            return
        } else {

        }


        let userId = getUserIdFromLocalStorage()
        let url = `/release/mongoDB?methodName=itemList_getItemListByPage&userId=${userId}&pageNum=${currentPage + 1}&limitNum=${10}`
        if (searchInputValue && searchInputValue.trim()) {
            url = `/release/mongoDB?methodName=itemList_getItemListByPage&userId=${userId}&pageNum=${currentPage + 1}&limitNum=${10}&searchInput=${searchInputValue}`
        }

        let response = await fetchGet(url)

        if (response.body && response.body.list && response.body.list.length > 0) {
            setCurrentPage(currentPage + 1)
            setItemList([...itemList, ...response.body.list])
            if (response.body.list.length >= 10) {
                setHasMore(true)
            } else {
                setHasMore(false)
            }
        } else {
            setHasMore(false)
        }

        /*return <div>
            <span>{item.position}</span>
            <span className='item-category'>{item.category}</span>
        </div>*/
    }

    return (
        <div className='item-list-wrapper'>
            <div className="search-input-wrapper ">
                <SearchBar className='search-input'
                           onSearch={val => {
                               search(val.trim())
                           }}
                           clearable={false}
                           onChange={val => {
                               if (val.trim() === '') {
                                   search()
                               }
                           }}
                           onClear={() => {

                           }}
                />
                {loadingList ? <div className='search-loading'><DotLoading color='primary'/></div> : ''}
            </div>
            <div className="list-wrapper">

                {itemList && itemList.length > 0 ?
                    <div>
                        <List header='物品清单'>
                            <PullToRefresh onRefresh={search}>
                                {itemList.map(item => {
                                    return <List.Item prefix={<Icon name='notebook'/>} description={getDesc(item)}
                                                      key={item._id}
                                                      extra={item.count}
                                                      onClick={() => {
                                                      }}>
                                        {item.name}
                                    </List.Item>
                                })}
                            </PullToRefresh>
                        </List>
                        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={50}></InfiniteScroll>
                    </div>
                    : <div></div>
                }





                    {/* <List.Item prefix={<Icon name='camera'/>} description='电视柜右1' onClick={() => {
                    }}>
                        相机
                    </List.Item>
                    <List.Item prefix={<Icon name='Thermometer'/>} description='床头柜左2' onClick={() => {
                    }}>
                        温度计
                    </List.Item>
                    <List.Item prefix={<Icon name='notebook'/>} description='电视柜左2' onClick={() => {
                    }}>
                        一本书
                    </List.Item>
                    <List.Item prefix={<Icon name='camera'/>} description='电视柜右1' onClick={() => {
                    }}>
                        相机
                    </List.Item>
                    <List.Item prefix={<Icon name='Thermometer'/>} description='床头柜左2' onClick={() => {
                    }}>
                        温度计
                    </List.Item>
                    <List.Item prefix={<Icon name='notebook'/>} description='电视柜左2' onClick={() => {
                    }}>
                        一本书
                    </List.Item>
                    <List.Item prefix={<Icon name='camera'/>} description='电视柜右1' onClick={() => {
                    }}>
                        相机
                    </List.Item>
                    <List.Item prefix={<Icon name='Thermometer'/>} description='床头柜左2' onClick={() => {
                    }}>
                        温度计
                    </List.Item>
                    <List.Item prefix={<Icon name='notebook'/>} description='电视柜左2' onClick={() => {
                    }}>
                        一本书
                    </List.Item>
                    <List.Item prefix={<Icon name='camera'/>} description='电视柜右1' onClick={() => {
                    }}>
                        相机
                    </List.Item>
                    <List.Item prefix={<Icon name='Thermometer'/>} description='床头柜左2' onClick={() => {
                    }}>
                        温度计
                    </List.Item>*/}


            </div>
        </div>
    )


}

export default ItemList