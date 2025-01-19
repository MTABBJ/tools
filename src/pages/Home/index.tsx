import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Link, } from "react-router-dom";
import {
  Button, Form, Input, Popconfirm, Table, Card,
  Row, Col, Flex, Typography
} from 'antd';
import { localPath } from '@/const'
import { staticData } from './const'
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
  background: '#fff',
};
const cardStyles = { body: { padding: 0, overflow: 'hidden', height: '13rem' }, }
const cardStyle: React.CSSProperties = {
  background: '#fff',
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: '18rem',
};

const App: React.FC = () => {
  const handleClick = (path: string) => {
    if (path.startsWith('/')) {
      // 对于本地路由，使用 window.open 打开新窗口
      window.open(window.location.origin + path, '_blank');
    } else {
      // 对于外部链接，直接使用 a 标签的默认行为
      window.open(path, '_blank');
    }
  };

  return (
    <div className='home-page'>
      <Card title="应急工具站" style={{ width: '90vw', height: '90vh' }} >
        <Card>
          {staticData.map((item) => (
            <Card.Grid style={gridStyle}>
              <Typography>
                <Title level={3}>{item.title}</Title>
                <Paragraph>
                  {item.description}
                </Paragraph>
              </Typography>
              {/* <Link to={`${item.path}`}> */}
              <Button type="primary" onClick={() => handleClick(item.path)}> 点击前往 </Button>
              {/* </Link> */}
            </Card.Grid>
          ))}
        </Card>

      </Card>
    </div>
  );
};

export default App;