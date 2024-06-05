"use client";
import React, { useEffect, useState } from 'react'
import {
    ArrowLeftOutlined
} from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation';
import { Row, message } from 'antd';
import QuestionCard from '@/components/QuestionCard';
import ControlBtns from '@/components/ControlBtns';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import AnswerModal from '@/components/AnswerModal';
import NoteModal from '@/components/NoteModal';
const changeKeys = (oldKey: string, newKey: string, lst: any[]) => {
    return lst.map(obj => {
        const { [oldKey]: value, ...rest } = obj;
        return { ...rest, [newKey]: value };
    });
}
const removeKeys = (keyToRemove: string, lst: any[]) => {
    return lst.map(obj => {
        const { [keyToRemove]: removedValue, ...rest } = obj; // Destructure and exclude key
        return { ...rest }; // Create new object without the removed key
    });
}
const Exam = () => {
    // id is Exam.name or code
    const { currentUser }:{currentUser: any} = useSelector((state: any) => state.users);
    const { id } = useParams();
    const router = useRouter();
    const onClickBack = (topicSlug: string) => {
        router.push('/topics/' + topicSlug)
    }
    const [examTry, setExamTry] = useState<any[]>([])
    const dispatch = useDispatch();
    const [data, setData] = useState<any>();
    const fetchInit = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.get(`/api/exams/${id}?userId=${currentUser._id}`);
            console.log("response .....", response)
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
            setExamTry([...dataToExamTry])
        } catch (error: any) {
            console.log(error);
            message.error(error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };
    useEffect(() => {
        fetchInit()
    }, [])
    const onSave = async (url: any) => {
        try {
            dispatch(SetLoading(true));
            let toAddList = removeKeys('eAnswerId', [...examTry].filter(el => !el.eAnswerId))
            let toUpdateList = [...examTry].filter(el => el.eAnswerId)
            const response = await axios.post("/api/answers", { toAddList, toUpdateList });
            message.success(response.data.message);
            dispatch(SetLoading(false));
            router.push("/topics/"+url);
        } catch (error: any) {
            message.error(error.response.data.message || "Something went wrong");
        } finally {
            dispatch(SetLoading(false));
        }
    };
    const changeAns = (questionId: string, selectedAns: string) => {
        let tmpExamTry = [...examTry]
        for (let i = 0; i < tmpExamTry.length; i++) {
            if (tmpExamTry[i].questionId == questionId) {
                tmpExamTry[i].lbl = selectedAns;
                break;
            }
        }
        setExamTry([...tmpExamTry])
    };
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

    return (
        <>{data && <>
            {answerModalData && <AnswerModal answerModalData={answerModalData} isAnswerModalOpen={isAnswerModalOpen} handleModalBtns={handleModalBtns} ></AnswerModal>}
            {noteModalData && <NoteModal noteModalData={noteModalData} isNoteModalOpen={isNoteModalOpen} handleModalBtns={handleNoteModalBtns} ></NoteModal>}
            <div style={{ display: "flex" }}>  <ArrowLeftOutlined className='backbtn' onClick={() => onClickBack(data.topicSlug)} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3> {data.topicName + ` > `}{data.name}</h3></div>
            <ControlBtns onSave={()=>onSave(data.topicSlug)} />
            <div style={{ width: "90%", border: "1px solid gray", padding: "10px 10px 200px 10px", margin: "0 auto" }}>
                {data.questions.length > 0 && data.questions.map((el: any, index: number) => <>
                    <QuestionCard imgLink={el.imgLink} note={el.note} videoLink={el.videoLink} showNoteModal={showNoteModal} showAnswerModal={showAnswerModal} eAnsLbl={el.eAnsLbl} changeAns={changeAns} order={index} id={el._id} rightLbl={el.rightLbl}></QuestionCard>
                </>)}
            </div>
            <ControlBtns onSave={()=>onSave(data.topicSlug)} />
        </>}
        </>
    )
}
export default Exam;
