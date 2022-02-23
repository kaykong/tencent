import React, {useState} from "react";
import {HashRouter} from 'react-router-dom';
import {Route, Navigate, Routes} from 'react-router';
import ItemList from "../pages/itemList/ItemList";
import Bottom from "../components/bottom/Bottom";
import style from './index.scss'
import MyTest from "../pages/myTest";



class Routers extends React.Component {
    render() {
        return (
            <div className='app'>
                <HashRouter basename=''>
                    <div className='body'>
                        <Routes>
                            ...
                            <Route exact path="/" element={<Navigate to="/item-list"/>}/>
                            <Route path="/item-list" element={<ItemList/>}/>
                            <Route path="/test" element={<MyTest/>}/>
                            <Route path="/me" element={<MyTest/>}/>
                            {/* <Route path="/index" Component={} /> */}
                        </Routes>
                    </div>
                    <div className="bottom">
                        <Bottom/>
                    </div>
                </HashRouter>

            </div>

        )
    }
}

export default Routers;