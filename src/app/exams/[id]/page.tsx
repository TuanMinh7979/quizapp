"use client";
import React, { useState } from 'react'
import {
    ArrowLeftOutlined
} from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation';
import data from '@/app/mock/Topic';
import { TopicType } from '@/app/mock/types';
import { Row } from 'antd';
import QuestionCard from '@/components/QuestionCard';
import ControlBtns from '@/components/ControlBtns';
const Exam = () => {
    const { id } = useParams();
    const router = useRouter();
    const topicInfo = useState<TopicType>((data.filter((el) => id.startsWith(el.prefixTestCode)))[0])[0]
    const onClickBack = () => {
        router.push(/topics/ + topicInfo.url)
    }

    return (
        <>
            <div style={{ display: "flex" }}>  <ArrowLeftOutlined className='backbtn' onClick={onClickBack} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3> {topicInfo.text + ` > `}{id}</h3></div>
            <ControlBtns />
            <div style={{ width: "90%", border: "1px solid gray", padding: "10px 10px 200px 10px", margin: "0 auto" }}>

                <QuestionCard id="q1" ans="A"></QuestionCard>


                <QuestionCard id="q2" ans="B"></QuestionCard>
               
               
            </div>
            <ControlBtns />


        </>
    )
}

export default Exam;
