import React, { useState, useEffect, useRef } from 'react';
import click_sound from '@/assets/click_sound.mp3';
import {
  Button, Form, Input, Slider, Card,
  Row, Col, Space, Typography, Radio
} from 'antd';
const { Title, Paragraph, Text } = Typography;

const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(160);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [timeSignature, setTimeSignature] = useState('4/4'); // 新增：存储节拍类型的状态
  const audioRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    audioRef.current = new Audio(click_sound);
  }, []);

  // 开始播放节拍器
  const startMetronome = () => {
    if (!audioRef.current) return;
    setIsPlaying(true);
    const intervalTime = (60 / bpm) * 1000;
    intervalRef.current = setInterval(() => {
      // 根据节拍类型更新当前节拍的计算逻辑
      let beatsPerMeasure;
      switch (timeSignature) {
        case '4/4':
          beatsPerMeasure = 4;
          break;
        case '3/4':
          beatsPerMeasure = 3;
          break;
        case '2/4':
          beatsPerMeasure = 2;
          break;
        case '1/4':
          beatsPerMeasure = 1;
          break;
        default:
          beatsPerMeasure = 4;
      }
      setCurrentBeat((prevBeat) => (prevBeat + 1) % beatsPerMeasure);
      if (audioRef.current.paused) {
        audioRef.current.play().catch((error:any) => {
          console.error('音频播放失败:', error);
        });
      } else {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error:any) => {
          console.error('音频播放失败:', error);
        });
      }
    }, intervalTime);
  };

  // 停止播放节拍器
  const stopMetronome = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const changeBpm = (event:any) => {
    const newBpm = parseInt(event);
    if (!isNaN(newBpm)) {
      setBpm(newBpm);
      if (isPlaying) {
        stopMetronome();
        startMetronome();
      }
    }
  };

  const increaseBpm = () => {
    const newBpm = bpm + 1;
    setBpm(newBpm);
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  };

  const decreaseBpm = () => {
    const newBpm = bpm - 1;
    setBpm(newBpm);
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  };

  // 改变节拍类型的函数
  const changeTimeSignature = (e:any) => {
    setTimeSignature(e.target.value);
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>在线节拍器</h1>
      <Card style={{ width: '60vw', }} >
        <Row
          gutter={[16, 16]}
          style={{ height: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center' }}
        >
          <Col span={24}><Title>{bpm} BPM</Title></Col>
          <Col span={24}>
            <Row>
              <Col span={4}><Button type="primary" shape="circle" onClick={decreaseBpm}>-</Button></Col>
              <Col span={16}>
                <Slider
                  disabled={false}
                  min={1}
                  max={300}
                  value={bpm}
                  onChange={changeBpm}
                />
              </Col>
              <Col span={4}> <Button type="primary" shape="circle" onClick={increaseBpm}>+</Button></Col>
            </Row>
          </Col>

          <Col span={24}>
            <Radio.Group onChange={changeTimeSignature} value={timeSignature}>
              <Radio value="4/4">4/4</Radio>
              <Radio value="3/4">3/4</Radio>
              <Radio value="2/4">2/4</Radio>
              <Radio value="1/4">1/4</Radio>
            </Radio.Group>
          </Col>
          <Col span={24}> <Text>当前节拍: {currentBeat + 1}</Text></Col>
          <Col span={24}>
            <Button type="primary" onClick={isPlaying ? stopMetronome : startMetronome}>
              {isPlaying ? '停止' : '开始'}
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Metronome;