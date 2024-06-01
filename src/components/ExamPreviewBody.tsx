import React from 'react'
const ExamPreviewBody = (props: any) => {
    const { correctCnt, answerCnt, questionCnt, description } = props;
    return (
        <div className='exam-preview-body'>
            <div style={{
                color: "black", height: "80px", fontSize: "0.8rem", whiteSpace: "wrap",



            }}>
                {description}</div>
            <div><span style={{ color: "blue" }}>Answered : </span><span>{answerCnt}/{questionCnt}</span></div>
            <div><span style={{ color: "green" }}>Correct : {correctCnt}</span></div>
            <div><span style={{ color: "red" }}>Wrong : {answerCnt - correctCnt}</span></div>
        </div>
    )
}
export default ExamPreviewBody
