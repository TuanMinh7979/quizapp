"use client";
import React, { useState } from 'react'
import { Button, Col, Divider, Row } from "antd";
import ExamCard from '@/components/ExamCard';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeftOutlined
} from '@ant-design/icons'
import { TopicType } from '@/app/mock/types';
import data from '@/app/mock/Topic';
const Section = () => {
  const style: React.CSSProperties = { padding: '0 0' };
  const { id } = useParams();
  const router = useRouter();
  const onClickBack = () => {

    router.push("/")


  }
  const topicInfo = useState<TopicType>((data.filter((el) => id == el.url))[0])[0]
  return (
    <>
      <div style={{ display: "flex" }}>  <ArrowLeftOutlined className='backbtn' onClick={onClickBack} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3>{topicInfo.text}</h3></div>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={6}>
          <div className="math-section" style={style}><ExamCard url={`/exams/${topicInfo.prefixTestCode}1`} title={`${topicInfo.prefixTestCode}1`}></ExamCard></div>
        </Col>
      </Row>
    </>
  )
}

export default Section;
