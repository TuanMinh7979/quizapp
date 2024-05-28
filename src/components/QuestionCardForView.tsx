import { Row } from 'antd'
import React, { useState } from 'react'

interface PropsType {
    rightLbl: string;
    id: string;
    order: number,
    changeAns: Function;
    eAnsLbl: string;

}

const QuestionCardForView = (props: PropsType) => {

    const [selectedAns, setSelectedAns
    ] = useState(props.eAnsLbl ? props.eAnsLbl : '');

    const onChangeAns = (event: any) => {
        setSelectedAns(event.target.value);
        props.changeAns(props.id, event.target.value)
    };


    return (
        <div style={{ borderBottom: "1px dashed black", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "10px 0px 10px 0px" }}>
            <div style={{ margin: "0 auto" }}>
                <img style={{ objectFit: "cover", width: "1000px", height: "300px" }} src="https://i.ex-cdn.com/giadinhmoi.vn/files/news/2022/07/07/de-thi-mon-toan-tot-nghiep-thpt-quoc-gia-2022-tat-ca-ma-de-day-du-nhat-164634.jpg" alt="" />
            </div>
            <div style={{ width: "80%", margin: "0 auto", display: "flex", justifyContent: 'center' }}>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label

                         className={`ans-label ans-label-disabled  ${selectedAns == 'A' ? 'selected' : ''} ${props.rightLbl == 'A' ? 'correct-ans' : ''}`} >A</label> <input disabled className='ans-radio' type="radio" id={`${props.id}A`} name={props.id} value="A" />


                </div>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label  className={`ans-label ans-label-disabled ${selectedAns == 'B' ? 'selected' : ''} ${props.rightLbl == 'B' ? 'correct-ans' : ''}`} >B</label> <input disabled className='ans-radio' type="radio" id={`${props.id}B`} name={props.id} value="B" />


                </div>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label  className={`ans-label ans-label-disabled ${selectedAns == 'C' ? 'selected' : ''} ${props.rightLbl == 'C' ? 'correct-ans' : ''}`} >C</label> <input disabled className='ans-radio' type="radio" id={`${props.id}C`} name={props.id} value="C" />


                </div>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label  className={`ans-label ans-label-disabled ${selectedAns == 'D' ? 'selected' : ''} ${props.rightLbl == 'D' ? 'correct-ans' : ''}`} >D</label> <input disabled className='ans-radio' type="radio" id={`${props.id}D`} name={props.id} value="D" />


                </div>

            </div>

        </div>
    )
}

export default QuestionCardForView;
