import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Link from 'next/link';
import Meta from 'antd/es/card/Meta';


interface PropsType {
    title: string;
    url: string

}



const ExamCard = (props: PropsType) => (
    <Link href={props.url}><Card

        style={{ width: "100%" }}
        // cover={
        //   <img
        //     alt="example"
        //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //   />
        // }
        actions={[
              <SettingOutlined key="setting" />,

              <EllipsisOutlined key="ellipsis" />,
        ]}
    >
        <Meta

            title={props.title}


        />
    </Card></Link>
);

export default ExamCard;