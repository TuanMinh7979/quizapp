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
    correctCnt: number

}

const ViewResultComponent = (cb: any) => {
    return (<span onClick={cb}>View Result</span>)

}


const ExamCard = (props: PropsType) => {
    const { title, url, answerCnt, questionCnt, correctCnt } = props;
    const router = useRouter();
    const onShowViewResult = (event: any) => {
        event.preventDefault()
        event.stopPropagation()
        router.push(url.replace("exams","viewresults"))
       
    }


    return <Link href={url}><Card

        style={{ width: "100%" }}
        cover={
            <div style={{ display: "flex", justifyContent: "space-between", padding: '0px 20px', borderBottom: "1px solid #C6CBDE" }}><h3 >{title}</h3>
                {correctCnt == questionCnt && correctCnt != 0 ? <h4 className='exam-status exam-status-done'>Done</h4> : answerCnt == 0 ? <h4 className='exam-status exam-status-new'>New</h4> : <h4 className='exam-status exam-status-continue'>Continue</h4>}

            </div>
        }
        actions={
            correctCnt == questionCnt && correctCnt != 0 ?

                [
                    <span>ReTest</span>,
                    ViewResultComponent(onShowViewResult)
                ] : answerCnt == 0 ?

                    [<span>Start</span>,
                    ViewResultComponent(onShowViewResult)]
                    : [<span>Continue</span>,
                    ViewResultComponent(onShowViewResult)]


        }
    >
        <Meta

            title={<ExamPreviewBody correctCnt={correctCnt} questionCnt={questionCnt} answerCnt={answerCnt}></ExamPreviewBody>}



        />
    </Card></Link>
}





export default ExamCard;