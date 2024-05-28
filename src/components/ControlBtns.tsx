import { Button } from 'antd'
import React from 'react'

const ControlBtns = (props: any) => {
    return (
        <div style={{ display: "flex", gap: "20px", marginLeft: "auto", justifyContent: "flex-start", width: "250px", }}>
            <Button>Scroll</Button>
            {props.onSave ? <Button onClick={props.onSave}>Save</Button> : ''}

        </div>
    )
}

export default ControlBtns
