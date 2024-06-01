"use client";
import SectionCard from "@/components/SectionCard";
import { Button, Col, Divider, Row, message } from "antd";
import data from '@/app/mock/Topic';
import { useEffect, useState } from "react";
import { SetLoading } from "@/redux/loadersSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
export default function Home() {
  const style: React.CSSProperties = { padding: '0 0' };
  const [topics, setTopics] = useState([])
  const dispatch = useDispatch()
  const fetchInit = async () => {
    try {
      dispatch(SetLoading(true));
      const rs = await axios.get(`/api/topics`);
      let topicLs = rs.data.topicList;
      setTopics(topicLs);
      dispatch(SetLoading(false));
    } catch (error: any) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchInit()
  }, [])
  return (
    <>
      <Divider orientation="left">Topic</Divider>
      <Row gutter={[16, 24]}>
        {
          topics && topics.length && topics.map((el:any) => <>
            <Col className="gutter-row" span={6}>
              <div className="math-section" style={style}><SectionCard url={`/topics/${el.slug}`} title={el.name}></SectionCard></div>
            </Col>
          </>)
        }
      </Row>
    </>
  );
}
