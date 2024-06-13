"use client";
import SectionCard from "@/components/SectionCard";
import { Button, Col, Divider, Row, message } from "antd";

import { useEffect, useState } from "react";
import { SetLoading } from "@/redux/loadersSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
export default function Home() {
  const style: React.CSSProperties = { padding: '0 0' };
  const [topics, setTopics] = useState([])
  const dispatch = useDispatch()

  const [currentSubject, setCurrentSubject] = useState("T")
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
      <Divider orientation="left">
        <div className="flex-bet w-200"><button className={`${currentSubject=="T"?'bg-cyan':''}`} onClick={()=>setCurrentSubject('T')}>Toán</button>
          <button className={`${currentSubject=="H"?'bg-cyan':''}`} onClick={()=>setCurrentSubject('H')}>Hóa học</button></div>

      </Divider>
      <Row gutter={[16, 24]}>
        {
          currentSubject=="T" && topics && topics.length > 0 && topics.filter((el:any)=>!el.name.startsWith("HH")).map((el: any) => <>
            <Col className="gutter-row" span={6}>
              <div className="math-section" style={style}><SectionCard url={`/topics/${el.slug}`} title={el.name}></SectionCard></div>
            </Col>
          </>)
        }
        {
          currentSubject=="H" && topics && topics.length > 0 && topics.filter((el:any)=>el.name.startsWith("HH")).map((el: any) => <>
            <Col className="gutter-row" span={6}>
              <div className="math-section" style={style}><SectionCard url={`/topics/${el.slug}`} title={el.name}></SectionCard></div>
            </Col>
          </>)
        }
      </Row>
    </>
  );
}
