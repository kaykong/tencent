import React from "react";
import { HashRouter } from 'react-router-dom';
import { Route,Navigate, Routes } from 'react-router';

// import { ListByModuleId } from '../pages'

const MyTest = () => {
    return (
        <div>
            我的测试页面
        </div>
    )
}

const ItemList = () => {
    return (
        <div>
            我的ItemList页面
        </div>
    )
}

class Routers extends React.Component{
    render() {
        return(
            <HashRouter basename=''>
                <div>
                    <Routes>
                        ...
                        <Route exact path="/" element={<Navigate to="/item-list" />} />
                        <Route path="/item-list" element={<ItemList />} />
                        <Route path="/test" element={<MyTest />} />
                        {/* <Route path="/index" Component={} /> */}
                    </Routes>
                </div>
            </HashRouter>
        )
    }
}

export default Routers;