import { Button } from 'antd'
import React from 'react'

const ControlBtns = () => {
    return (
        <div style={{ display: "flex", gap: "20px", marginLeft: "auto", justifyContent: "flex-start", width: "250px", }}>
            <Button>Scroll</Button>
            <Button>Save</Button>
        </div>
    )
}

export default ControlBtns
