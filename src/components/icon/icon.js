import './index.scss'
import './assets/iconfont'
// import '//at.alicdn.com/t/font_3197725_eigow4im94m.js'
// import '//at.alicdn.com/t/font_3197725_k5lkdj7867f.js'
/*
    从icon图标网站下载, 在
 */

export const Icon = (props) => {
    // console.log(props)

    return (
        <div>
            <svg className="icon" aria-hidden="true" style={props.style}>
                <use xlinkHref={"#icon-" + props.name}></use>
            </svg>
        </div>
    )
}

