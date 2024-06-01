import React from 'react'

const ExamPreviewBody = (props: any) => {
    const { correctCnt, answerCnt, questionCnt, description } = props;
    return (
        <div className='exam-preview-body'>

            <span style={{ color:"blue" }}>{description}</span>

            <div><span >Answered : </span><span>{answerCnt}/{questionCnt}</span></div>
            <div><span style={{ color: "green" }}>Correct : {correctCnt}</span></div>
            <div><span style={{ color: "red" }}>Wrong : {answerCnt - correctCnt}</span></div>

        </div>


    )
}

export default ExamPreviewBody

