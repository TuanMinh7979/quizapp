"use client";
import SectionCard from "@/components/SectionCard";
import { Button, Col, Divider, Row, message } from "antd";

import { useEffect, useState } from "react";
import { SetCurrentSubJect, SetLoading } from "@/redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
export default function Home() {
  const style: React.CSSProperties = { padding: '0 0' };
  const [topics, setTopics] = useState([])
  const dispatch = useDispatch()
  const { currentSubject } = useSelector((state: any) => state.loaders);

  const fetchInit = async () => {
    try {
      dispatch(SetLoading(true));
      const rs = await axios.get(`/api/topics/hh`);
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

  const onSubjectChange = (val: String) => {
    dispatch(SetCurrentSubJect(val))
  }





  return (
    <>
      <Divider orientation="left">
        <div className="flex-bet w-900">
          <button className={`${currentSubject == "HHLTTC"? 'bg-cyan' : ''}`} onClick={() => onSubjectChange('HHLTTC')}>Hóa Lý thuyết Tính Chất(LTTC)</button>
          <button className={`${currentSubject == "HHLTPU" ? 'bg-cyan' : ''}`} onClick={() => onSubjectChange('HHLTPU')}>Hóa Lý thuyết Phản ứng(LTPU)</button>
          <button className={`${currentSubject == "HHBT" ? 'bg-cyan' : ''}`} onClick={() => onSubjectChange('HHBT')}>Bài tập Hóa học</button></div>

      </Divider>
      <Row gutter={[16, 24]}>{
        topics && topics.length > 0 && <> {
          currentSubject == "HHLTTC" && topics.filter((el: any) => el.name.startsWith("LTTC")).map((el: any) => <>
            <Col className="gutter-row" span={6}>
              <div className="math-section" style={style}><SectionCard url={`/topics/${el.slug}`} title={el.name}></SectionCard></div>
            </Col>
          </>)
        }
          {
            currentSubject == "HHLTPU" && topics.filter((el: any) => el.name.startsWith("LTPU")).map((el: any) => <>
              <Col className="gutter-row" span={6}>
                <div className="math-section" style={style}><SectionCard url={`/topics/${el.slug}`} title={el.name}></SectionCard></div>
              </Col>
            </>)
          }
          {
            currentSubject == "HHBT" && topics.filter((el: any) => el.name.startsWith("BT")).map((el: any) => <>
              <Col className="gutter-row" span={6}>
                <div className="math-section" style={style}><SectionCard url={`/topics/${el.slug}`} title={el.name}></SectionCard></div>
              </Col>
            </>)
          }</>

      }


      </Row>
    </>
  );
}
