import './index.scss'
import './assets/iconfont'
/*
    从icon图标网站下载, 在
 */

export const Icon = (props) => {
    console.log(props)
    return (
        <div>
            <svg className="icon" aria-hidden="true" >
                <use xlinkHref={"#icon-" + props.name}></use>
            </svg>
        </div>
    )
}

