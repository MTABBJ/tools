import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Link, } from "react-router-dom";
import {
  Button, Form, Input, Popconfirm, Table, Card,
  Row, Col, Flex, Typography
} from 'antd';
import { localPath } from '@/const'
import nijiGTA from '@/assets/nijiGTA.jpg'
const { Title, Paragraph, Text } = Typography;

const cardStyle: React.CSSProperties = {
  background: '#fff',
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 273,
};

const App: React.FC = () => {
  const [count, setCount] = useState(2);
  const [currentText, setCurrentText] = useState<string>();

  return (
    <div className='home-page'>
      <Card title="应急工具站" style={{ width: '90vw', height: '90vh' }} >
        <Row gutter={[16, 16]}>
          <Col>
            <Card hoverable styles={{ body: { padding: 0, overflow: 'hidden' }, }} style={cardStyle}>
              <Flex justify="space-between">
                <img
                  alt="avatar"
                  src={nijiGTA}
                  style={imgStyle}
                />
                <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                  <Typography>
                    <Title level={3}>指名手配文案生成ツール</Title>
                    <Paragraph>
                      にじGTA警察署専用、指名手配の文案を生成するツールです。
                    </Paragraph>
                  </Typography>
                  <Link to={`${localPath}/smth`}>
                    <Button type="primary"> 点击前往 </Button>
                  </Link>
                </Flex>
              </Flex>
            </Card>
          </Col>
          <Col>
            <Card hoverable styles={{ body: { padding: 0, overflow: 'hidden' }, }} style={cardStyle}>
              <Flex justify="space-between">
                <img
                  alt="avatar"
                  src={nijiGTA}
                  style={imgStyle}
                />
                <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                  <Typography.Title level={3}>
                    指名手配文案生成ツール
                  </Typography.Title>
                  <Link to={`${localPath}/smth`}>
                    <Button type="primary">
                      点击前往
                    </Button>
                  </Link>

                </Flex>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default App;