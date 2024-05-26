"use client";


import SectionCard from "@/components/SectionCard";
import { Button, Col, Divider, Row } from "antd";
import data from '@/app/mock/Topic';

export default function Home() {
  const style: React.CSSProperties = { padding: '0 0' };


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
