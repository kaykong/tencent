import {Input} from "antd-mobile";

export const InputSearch = (props) => {
    return (
        <div>
            <Input onChange={console.log} placeholder={props.placeholder}/>
            <div className='input-search-list'>

            </div>
        </div>
    )
}