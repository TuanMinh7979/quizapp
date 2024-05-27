import { Row } from 'antd'
import React, { useState } from 'react'

interface PropsType {
    ans: string;
    id: string

}

const QuestionCard = (props: PropsType) => {

    const [selectedAns, setSelectedAns
    ] = useState('');

    const onChangeAns = (event: any) => {
        setSelectedAns(event.target.value);
    };

    return (
        <div style={{ borderBottom: "1px dashed black", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding:"10px 0px 10px 0px" }}>
            <div style={{ margin: "0 auto" }}>
                <img style={{ objectFit: "cover", width: "1000px", height: "300px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLaGstu_5h_XZNusvQ9NrTDUGo8eF7xwORRqv8dZeV&s" alt="" />
            </div>
            <div style={{ width: "80%", margin: "0 auto", display: "flex", justifyContent: 'center' }}>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label

                        htmlFor={`${props.id}A`} className={`ans-label ${selectedAns == 'A' ? 'selected' : ''}`} >A</label> <input onChange={onChangeAns} className='ans-radio' type="radio" id={`${props.id}A`} name={props.id} value="A" />


                </div>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label htmlFor={`${props.id}B`} className={`ans-label ${selectedAns == 'B' ? 'selected' : ''}`} >B</label> <input onChange={onChangeAns} className='ans-radio' type="radio" id={`${props.id}B`} name={props.id} value="B" />


                </div>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label htmlFor={`${props.id}C`} className={`ans-label ${selectedAns == 'C' ? 'selected' : ''}`} >C</label> <input onChange={onChangeAns} className='ans-radio' type="radio" id={`${props.id}C`} name={props.id} value="C" />


                </div>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label htmlFor={`${props.id}D`} className={`ans-label ${selectedAns == 'D' ? 'selected' : ''}`} >D</label> <input onChange={onChangeAns} className='ans-radio' type="radio" id={`${props.id}D`} name={props.id} value="D" />


                </div>

            </div>

        </div>
    )
}

export default QuestionCard;
