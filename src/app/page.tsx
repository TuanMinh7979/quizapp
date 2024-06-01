"use client";


import SectionCard from "@/components/SectionCard";
import { Button, Col, Divider, Row, message } from "antd";
import data from '@/app/mock/Topic';
import { useState } from "react";
import { SetLoading } from "@/redux/loadersSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const style: React.CSSProperties = { padding: '0 0' };
  const [topics, setTopics] = useState([])
  const dispatch = useDispatch()
  const fetchInit = async () => {
    try {
      dispatch(SetLoading(true));

      dispatch(SetLoading(false));
    } catch (error: any) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  return (


    <>
      <Divider orientation="left">Topic</Divider>


      <Row gutter={[16, 24]}>
        {
          data && data.length && data.map(el => <>
            <Col className="gutter-row" span={6}>
              <div className="math-section" style={style}><SectionCard url={`/topics/${el.url}`} title={el.text}></SectionCard></div>
            </Col>
          </>)
        }


      </Row>
    </>

  );
}
