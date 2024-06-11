import { Button, Select } from 'antd'
import React from 'react'
const ControlBtns = (props: any) => {
    return (
        <div style={{ display: "flex", gap: "20px", marginLeft: "auto", justifyContent: "flex-start", width: "450px", }}>
            <select style={{width:"220px"}} onChange={props.onShowModeChange}>
                <option value="0">Tất cả</option>
                <option value="1">Chỉ các câu chưa làm</option>
                <option value="2">Các câu làm sai</option>
             </select>
            <Button>Scroll</Button>
            {props.onSave ? <Button onClick={props.onSave}>Save</Button> : ''}
        </div>
    )
}
export default ControlBtns
