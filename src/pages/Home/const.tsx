import { localPath } from '@/const'
import {
    Button, Form, Input, Popconfirm, Table, Card,
    Row, Col, Flex, Typography
} from 'antd';
const { Title, Paragraph, Text } = Typography;

export const staticData = [
    {
        title: "后台管理模板",
        description: <Typography>
            <Text>{'React + Vite + TypeScript'} </Text><br/>
            <Text>{'Ant Design + React Router + React Context'} </Text><br/>
            <a href='https://github.com/MTABBJ/my-react-tools?tab=readme-ov-file#%E6%BC%94%E7%A4%BA%E5%A4%8D%E5%88%BB'>部分功能演示</a>
        </Typography>,
        path: "https://mtabbj.github.io/my-react-tools/login",
        type:'online'
    },
    {
        title: "指名手配文案生成ツール",
        description: "にじGTA警察署専用、指名手配の文案を生成するツールです。",
        path: `${localPath + "/smth"}`,
        type:'local'
    },
    {
        title: "在线节拍器",
        description: "打拍子的测量单位称为 BPM（每分钟拍数），拍速标为 60 BPM 等于分秒打一拍，而 120 BPM 等于每秒打两拍。",
        path: `${localPath + "/metronome"}`,
        type:'local'
    },

    // {
    //     title: "绘制电子区域",
    //     description: "使用canvas绘制电子区域",
    //     path: `${localPath + "/drawarea"}`,
    // },
];