import { memo, useState, useEffect } from 'react'
// import { Button, Form, Input, Select, Card, message, Modal, Space, Checkbox, Row, Col } from 'antd';
import './index.less'

const filds = [
  { title: '111', value: 100 },
  { title: '11', value: 30 },
  { title: '11', value: 38 },
]

const Home = memo(() => {
  // const { } = props;

  const [customList, setCustomList] = useState<any>(filds);
  const [staticsList, setStaticsList] = useState<any>(filds);
  const [currentList, setCurrentList] = useState<any>([]);
  const [currentText, setCurrentText] = useState<string>();

  useEffect(() => {
  }, []);

  // const onFinish = (e: any) => {
  //   console.log('currentList', currentList);
  //   let sum = 0;
  //   let text = '';
  //   let date = new Date().toLocaleTimeString();
  //   currentList.map(i => {
  //     return i 
  //   })
  //   const str = `${'name:' + " value:"}  `
  //   setCurrentText(str)

  //   console.log('date',date );

  // }

  return (
    <>
      <div>
        <div >
          <ul>
            <li>111</li>
            <li>222</li>
            <li>333</li>
          </ul>
        </div>

        {/* <Input defaultValue={i.value} suffix="万" /> */}

        {/* <Card >
          <Row>
            <Col span={12}>
              <Card title={'title'} extra={<Button>secchi</Button>}>
                <Checkbox.Group
                  onChange={(e: any) => {
                    setCurrentList(e)
                  }}
                >
                  {staticsList.map((i: any) =>
                    <>
                      <Checkbox value={i}
                      // style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                      >
                        <span>{i.title}</span>
                        <span>{i.value}</span>
                      </Checkbox>
                      <br />
                    </>
                  )}
                </Checkbox.Group>
                <br />
                <Button onClick={onFinish}>output</Button>
              </Card>
            </Col>
            <Col span={12}>
              <Card title={'output'} >
                <textarea>{currentText}</textarea>
              </Card>
            </Col>
          </Row>

        </Card> */}
      </div>
    </>

  );
})


export default Home