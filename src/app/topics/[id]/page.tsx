"use client";
import React, { use, useEffect, useState } from 'react'
import { Button, Col, Divider, Row, message } from "antd";
import ExamCard from '@/components/ExamCard';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeftOutlined
} from '@ant-design/icons'
import { TopicType } from '@/app/mock/types';
import data from '@/app/mock/Topic';
import { useDispatch } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
const Section = () => {
  const style: React.CSSProperties = { padding: '0 0' };
  const { id } = useParams();
  const router = useRouter();
  const onClickBack = () => {

    router.push("/")


  }


  const dispatch = useDispatch();
  const [exams, setExams] = React.useState<any[]>([]);

  const fetchInit = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/exams?topicIdStr=${id}`);
  
      let dataTemp = response.data.rs;
      for (let examDataItem of dataTemp) {
        let questionsTemp = examDataItem.questions
        let answersTemp = examDataItem.answers
        let correctCnt = 0;
        for (let ansI of answersTemp) {
          let idx = questionsTemp.findIndex((el: any) => el._id == ansI.questionId);
          if (ansI.lbl == questionsTemp[idx].rightLbl) {
            correctCnt++;
          }
        }
        examDataItem["correctCnt"] = correctCnt


      }
   
      setExams(dataTemp);

    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchInit()
  }, [])

  return (
    <>{exams && exams.length > 0 && <>
      <div style={{ display: "flex" }}>  <ArrowLeftOutlined className='backbtn' onClick={onClickBack} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3>{exams[0]?.topic}</h3></div>
      <Row gutter={[16, 24]}>

        {exams.map((el) => <>

          <Col className="gutter-row exam-col" span={6}>
            <div className="math-section" style={style}><ExamCard correctCnt={el.correctCnt} questionCnt={el.questionCnt} answerCnt={el.answerCnt} url={`/exams/${el.name}`} title={el?.name}></ExamCard></div>
          </Col>
          
        </>)}

      </Row></>}
    </>
  )
}

export default Section;
