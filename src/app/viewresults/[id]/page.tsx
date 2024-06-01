"use client";
import React, { useEffect, useState } from 'react'
import {
    ArrowLeftOutlined
} from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation';
import { Row, message } from 'antd';
import ControlBtns from '@/components/ControlBtns';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import QuestionCardForView from '@/components/QuestionCardForView';
import AnswerModal from '@/components/AnswerModal';
const ViewResult = () => {
    // id is Exam.name or code
    const { currentUser } = useSelector((state: any) => state.users);
    const { id } = useParams();
    const router = useRouter();
    const onClickBack = (topicSlug: string) => {
        router.push('/topics/' + topicSlug)
    }
    const dispatch = useDispatch();
    const [data, setData] = useState<any>();
    const fetchInit = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.get(`/api/exams/${id}`);
            let qsList = response.data.rs.questions;
            let answerList = response.data.rs.answers;
            let dataToExamTry = []
            for (let el of qsList) {
                let eAnsIdx = answerList.findIndex((item: any) => item.questionId == el._id)
                dataToExamTry.push({
                    eAnswerId: eAnsIdx != -1 ? answerList[eAnsIdx]._id : '',
                    examId: response.data.rs._id,
                    questionId: el._id,
                    lbl: eAnsIdx != -1 ? answerList[eAnsIdx].lbl : '',
                    userId: currentUser._id
                })
                el["eAnsLbl"] = eAnsIdx != -1 ? answerList[eAnsIdx].lbl : ''
            }
            setData(response.data.rs);
        } catch (error: any) {
            message.error(error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };
    useEffect(() => {
        fetchInit()
    }, [])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState("")
    const showModal = (dataToOpen: any) => {
   
        setModalData(dataToOpen)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setModalData("");
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setModalData("");
        setIsModalOpen(false);
    };
    return (
        <>{data && <>
            {modalData && <AnswerModal modalData={modalData} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}></AnswerModal>}
            <div style={{ display: "flex" }}>  <ArrowLeftOutlined className='backbtn' onClick={() => onClickBack(data.topicSlug)} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3> {data.topicName + ` > `}{data.name}</h3></div>
            <ControlBtns />
            <div style={{ width: "90%", border: "1px solid gray", padding: "10px 10px 200px 10px", margin: "0 auto" }}>
                {data.questions.length > 0 && data.questions.map((el: any, index: number) => <>
                    <QuestionCardForView videoLink={el.videoLink} showModal={showModal} eAnsLbl={el.eAnsLbl} changeAns={() => { }} order={index} id={el._id} rightLbl={el.rightLbl}></QuestionCardForView>
                </>)}
            </div>
            <ControlBtns />
        </>}
        </>
    )
}
export default ViewResult;
