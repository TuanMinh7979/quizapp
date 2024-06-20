import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Link from 'next/link';
const { Meta } = Card;

const SectionCard = (props: any) =>{
    console.log(props)
  return  (
   
    <Link href={props.url}>
        <Card

            style={{ width: "100%", backgroundColor: `${props.vip == 1 ? '#e4f1fe' : props.vip == 2 ? '#cbf078' : ''}` }}

            actions={[

            ]}
        >
            <Meta
                title={props.title}
            />
        </Card></Link>
);
} 
export default SectionCard;