import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Link from 'next/link';
import Meta from 'antd/es/card/Meta';
import ExamPreviewBody from './ExamPreviewBody';
import { useRouter } from 'next/navigation';
interface PropsType {
    title: string;
    url: string;
    answerCnt: number,
    questionCnt: number,
    correctCnt: number ,
    description:string
}
const ViewResultComponent = (cb: any) => {
    return (<span onClick={cb}>Xem kết quả</span>)
}
const ExamCard = (props: PropsType) => {
    const { title, url, answerCnt, questionCnt, correctCnt, description } = props;
    const router = useRouter();
    const onShowViewResult = (event: any) => {
        event.preventDefault()
        event.stopPropagation()
        router.push(url.replace("exams", "viewresults"))
    }
    const onMainActionClick = (event: any) => {
        event.preventDefault()
        event.stopPropagation()
        router.push(url)
    }
    return <><Card
        style={{ width: "100%", border: "1px solid black" }}
        cover={
            <div style={{ display: "flex", justifyContent: "space-between", padding: '0px 20px', borderBottom: "1px solid #C6CBDE" }}><h3 >{title}</h3>
                {correctCnt == questionCnt && correctCnt != 0 ? <h4 className='exam-status exam-status-done'>Done</h4> : answerCnt == 0 ? <h4 className='exam-status exam-status-new'>New</h4> : <h4 className='exam-status exam-status-continue'>Continue</h4>}
            </div>
        }
        actions={
            correctCnt == questionCnt && correctCnt != 0 ?
                [
                    <span className="ctr-btn-1" onClick={onMainActionClick}>ReTest</span>,
                    ViewResultComponent(onShowViewResult)
                ] : answerCnt == 0 ?
                    [<span className="ctr-btn-2" onClick={onMainActionClick}>Start</span>,
                    ViewResultComponent(onShowViewResult)]
                    : [<span className="ctr-btn-3" onClick={onMainActionClick}>Continue</span>,
                    ViewResultComponent(onShowViewResult)]
        }
    >
        <Meta
            title={<ExamPreviewBody description={description} correctCnt={correctCnt} questionCnt={questionCnt} answerCnt={answerCnt}></ExamPreviewBody>}
        />
    </Card></>
}
export default ExamCard;