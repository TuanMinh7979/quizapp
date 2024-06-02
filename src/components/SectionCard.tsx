import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Link from 'next/link';
const { Meta } = Card;
interface PropsType {
    title: string;
    url: string
}
const SectionCard = (props: PropsType) => (
    <Link href={props.url}>
        <Card

            style={{ width: "100%", backgroundColor: props.title.startsWith("HH") ? "cyan" : "" }}
           
            actions={[
               
            ]}
        >
            <Meta
                title={props.title}
            />
        </Card></Link>
);
export default SectionCard;