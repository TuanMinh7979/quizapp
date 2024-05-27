"use client";
import React, { useEffect, useState } from 'react'
import {
    ArrowLeftOutlined
} from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation';
import data from '@/app/mock/Topic';
import { TopicType } from '@/app/mock/types';
import { Row, message } from 'antd';
import QuestionCard from '@/components/QuestionCard';
import ControlBtns from '@/components/ControlBtns';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
const Exam = () => {
    // id is Exam.name or code
    const { currentUser } = useSelector((state: any) => state.users);
    const { id } = useParams();
    const router = useRouter();
    const onClickBack = (topicIdStr: string) => {
        router.push('/topics/' + topicIdStr)
    }
    const [examTry, setExamTry] = useState<any[]>([])
    const dispatch = useDispatch();
    const [data, setData] = useState<any>();
    const fetchInit = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.get(`/api/exams/${id}`);
            console.log("-----------12", response.data);

            let qsList = response.data.rs.questions;
            let dataToExamTry = []
            for (let el of qsList) {
                dataToExamTry.push({
                    examId: response.data.rs._id,
                    questionId: el._id,
                    lbl: '',
                    userId: currentUser._id
                })
            }
            setData(response.data.rs);

            setExamTry([...dataToExamTry])
        } catch (error: any) {
            message.error(error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    useEffect(() => {
        fetchInit()
    }, [])




    const onSave = () => {
        console.log(examTry)
    }
    return (
        <>{data && <>

            <div style={{ display: "flex" }}>  <ArrowLeftOutlined className='backbtn' onClick={() => onClickBack(data.topicIdStr)} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3> {data.topic + ` > `}{data.name}</h3></div>
            <ControlBtns onSave={onSave} />
            <div style={{ width: "90%", border: "1px solid gray", padding: "10px 10px 200px 10px", margin: "0 auto" }}>
                {data.questions.length > 0 && data.questions.map((el: any, index: number) => <>

                    <QuestionCard order={index} id={el._id} rightLbl={el.rightLbl}></QuestionCard>
                </>)}






            </div>
            <ControlBtns onSave={onSave} />
        </>}



        </>
    )
}

export default Exam;
