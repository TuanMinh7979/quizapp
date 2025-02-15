
import React, { useState } from 'react'
import {
    InfoCircleOutlined
} from '@ant-design/icons'
const QuestionCardForView = (props: any) => {
    const [selectedAns, setSelectedAns
    ] = useState(props.eAnsLbl ? props.eAnsLbl : '');
    return (
        <div style={{ borderBottom: "1px dashed black", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "10px 0px 10px 0px" }}>
            <h3 style={{ width: "100%", display: "flex", justifyContent: "space-between" }}><span>
                <span style={{ color: "blue", fontWeight: "bold" }}>{props.order + 1}</span>
                &nbsp; &nbsp;  <span style={{ color: "#6d6d75", fontSize: "10px" }}>ID:{props.id}</span>
                {props.title && <> &nbsp; &nbsp;  <span style={{ color: "blue", fontSize: "12px" }}>{props.title}</span></>}

            </span>

                <div style={{ display: "flex", gap: "10%" }}>
                    <InfoCircleOutlined onClick={() => props.showNoteModal(<>{<b>Đáp án:  {props.rightLbl}</b>}   {props.note}</>)} className='info-icon' style={{ color: "blue" }} />
                    {props.videoLink.indexOf("start=0") == -1 && <> <button onClick={() => {
                        window.open(`${props.videoLink}&autoplay=1`, '_blank');
                    }}>Solution</button>
                        <button onClick={() => {
                            props.showAnswerModal(`${props.videoLink}&autoplay=1`, '_blank');
                        }}>Watch Solution</button></>}
                    &nbsp;&nbsp; {props.eAnsLbl == props.rightLbl ?
                        <span style={{ padding: "2px", background: "blue", color: "white" }}>Done</span> : props.eAnsLbl == '' ?
                            <span style={{ padding: "2px", background: "yellow", color: "black" }}>Miss</span> :
                            <span style={{ padding: "2px", background: "orange", color: "white" }}>Wrong</span>}
                </div>

            </h3>
            <div style={{ margin: "0 auto" }}>
                <img className="q-img" style={{ objectFit: "contain", width: "1000px",  height: "100%" }} src={props.imgLink} alt="" />
            </div>
            <div style={{ width: "80%", margin: "0 auto", display: "flex", justifyContent: 'center' }}>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label
                        className={`ans-label ans-label-disabled  ${selectedAns == 'A' && props.rightLbl == 'A' ? 'exact-ans' : selectedAns == 'A' ? 'selected' : props.rightLbl == 'A' ? 'right-ans' : ''} `} >A</label> <input disabled className='ans-radio' type="radio" id={`${props.id}A`} name={props.id} value="A" />
                </div>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label className={`ans-label ans-label-disabled ${selectedAns == 'B' && props.rightLbl == 'B' ? 'exact-ans' : selectedAns == 'B' ? 'selected' : props.rightLbl == 'B' ? 'right-ans' : ''}`} >B</label> <input disabled className='ans-radio' type="radio" id={`${props.id}B`} name={props.id} value="B" />
                </div>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label className={`ans-label ans-label-disabled ${selectedAns == 'C' && props.rightLbl == 'C' ? 'exact-ans' : selectedAns == 'C' ? 'selected' : props.rightLbl == 'C' ? 'right-ans' : ''}`} >C</label> <input disabled className='ans-radio' type="radio" id={`${props.id}C`} name={props.id} value="C" />
                </div>
                <div style={{ flex: "1", display: "flex", justifyContent: 'flex-start' }}>
                    <label className={`ans-label ans-label-disabled ${selectedAns == 'D' && props.rightLbl == 'D' ? 'exact-ans' : selectedAns == 'D' ? 'selected' : props.rightLbl == 'D' ? 'right-ans' : ''}`} >D</label> <input disabled className='ans-radio' type="radio" id={`${props.id}D`} name={props.id} value="D" />
                </div>
            </div>
        </div>
    )
}
export default QuestionCardForView;
