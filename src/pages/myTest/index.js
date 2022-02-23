import React, {useState} from "react";

let i = 200
const list = []
for (let j = 0; j < i; j++) {
    list.push('我的测试页面' + j)
}

const MyTest = () => {

    // const [list, setList] = useState([...list2])

    if (list.length >= 2010) {
        return (<div>
            123
        </div>)
    }


    return (
        <div style={{overflow: "auto"}}>
            {list.map(item => {
                return <div>{item}</div>
            })}
        </div>
    )
}

export default MyTest