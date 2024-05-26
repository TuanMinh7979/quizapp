"use client";
import React, { useState } from 'react'
import {
    ArrowLeftOutlined
} from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation';
import data from '@/app/mock/Topic';
import { TopicType } from '@/app/mock/types';
const Exam = () => {
    const { id } = useParams();
    const router = useRouter();
    const topicInfo = useState<TopicType>((data.filter((el) => id.startsWith(el.prefixTestCode)))[0])[0]
    const onClickBack = () => {
        router.push(/topics/ + topicInfo.url)
    }

    return (
        <>
            <div style={{ display: "flex" }}>  <ArrowLeftOutlined className='backbtn' onClick={onClickBack} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3> {topicInfo.text +` > `}{id}</h3></div>


        </>
    )
}

export default Exam;
