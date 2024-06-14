"use client";
import React, { useEffect, useState } from 'react'
import {
    ArrowLeftOutlined
} from '@ant-design/icons'
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Row, message } from 'antd';
import ControlBtns from '@/components/ControlBtns';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import QuestionCardForView from '@/components/QuestionCardForView';
import AnswerModal from '@/components/AnswerModal';
import NoteModal from '@/components/NoteModal';
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
            const response = await axios.get(`/api/exams/${id}?userId=${currentUser._id}`);
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
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
    const [answerModalData, setAnswerModalData] = useState("")
    const showAnswerModal = (dataToOpen: any) => {

        setAnswerModalData(dataToOpen)
        setIsAnswerModalOpen(true);
    };
    const handleModalBtns = () => {
        setAnswerModalData("");
        setIsAnswerModalOpen(false);
    };


    // 
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [noteModalData, setNoteModalData] = useState("")
    const showNoteModal = (dataToOpen: any) => {

        setNoteModalData(dataToOpen)
        setIsNoteModalOpen(true);
    };
    const handleNoteModalBtns = () => {
        setNoteModalData("");
        setIsNoteModalOpen(false);
    };
    const [showMode,setShowMode ] = useState("0");


    return (
        <>{data && <>
            {answerModalData && <AnswerModal answerModalData={answerModalData} isAnswerModalOpen={isAnswerModalOpen} handleModalBtns={handleModalBtns} ></AnswerModal>}
            {noteModalData && <NoteModal noteModalData={noteModalData} isNoteModalOpen={isNoteModalOpen} handleModalBtns={handleNoteModalBtns} ></NoteModal>}
            <div style={{ display: "flex" }}>  <ArrowLeftOutlined className='backbtn' onClick={() => onClickBack(data.topicSlug)} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3> {data.topicName + ` > `}{data.name}</h3></div>
            <ControlBtns onShowModeChange={(e:any)=>{setShowMode(e.target.value)}} saveNavigateUrl={data.topicSlug} />
            <div style={{ width: "90%", border: "1px solid gray", padding: "10px 10px 200px 10px", margin: "0 auto" }}>
                {showMode=="0" && data.questions.length > 0 && data.questions.map((el: any, index: number) => <>
                    <QuestionCardForView title= {el.title} note={el.note} imgLink={el.imgLink} showNoteModal={showNoteModal} videoLink={el.videoLink} showAnswerModal={showAnswerModal} eAnsLbl={el.eAnsLbl} changeAns={() => { }} order={index} id={el._id} rightLbl={el.rightLbl}></QuestionCardForView>
                </>)}
                {showMode=="1" && data.questions.length > 0 && data.questions.filter((el:any)=>el.eAnsLbl=="").map((el: any, index: number) => <>
                    <QuestionCardForView title= {el.title} note={el.note} imgLink={el.imgLink} showNoteModal={showNoteModal} videoLink={el.videoLink} showAnswerModal={showAnswerModal} eAnsLbl={el.eAnsLbl} changeAns={() => { }} order={index} id={el._id} rightLbl={el.rightLbl}></QuestionCardForView>
                </>)}
                {showMode=="2" && data.questions.length > 0 && data.questions.filter((el:any)=>el.eAnsLbl && el.eAnsLbl!==el.rightLbl ).map((el: any, index: number) => <>
                    <QuestionCardForView title= {el.title} note={el.note} imgLink={el.imgLink} showNoteModal={showNoteModal} videoLink={el.videoLink} showAnswerModal={showAnswerModal} eAnsLbl={el.eAnsLbl} changeAns={() => { }} order={index} id={el._id} rightLbl={el.rightLbl}></QuestionCardForView>
                </>)}
            </div>
            <ControlBtns onShowModeChange={(e:any)=>{setShowMode(e.target.value)}} saveNavigateUrl={data.topicSlug}/>
        </>}
        </>
    )
}
export default ViewResult;
