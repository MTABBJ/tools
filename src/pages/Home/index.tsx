import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import type { GetRef, InputRef } from 'antd';
import {
  Button, Form, Input, Popconfirm, Table, Card,
  Row, Col, InputNumber, Tooltip, Space
} from 'antd';
import {
  PlusOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { staticData } from '../../const'

const { TextArea } = Input;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  number: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} が必要です。`,
          },
        ]}
      >
        <>
          {dataIndex === 'number' ?
            <InputNumber
              style={{ width: '100%' }}
              ref={inputRef} onPressEnter={save} onBlur={save} prefix="￥" suffix="万円" />
            : <Input ref={inputRef} onPressEnter={save} onBlur={save} />}
        </>
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  number: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(staticData);
  const [curSource, setCurSource] = useState<DataType[]>([]);

  const [count, setCount] = useState(2);
  const [currentText, setCurrentText] = useState<string>();


  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '罪状',
      dataIndex: 'name',
      width: '30%',
      editable: true,
      align: 'center',
    },
    {
      title: <Tooltip title="罰金全部適当です">
        <Space>
          <span>罰金額</span><ExclamationCircleOutlined />
        </Space>
      </Tooltip>,
      dataIndex: 'number',
      editable: true,
      align: 'center',
      width: '60%',
      render: (text: string) => <>
        <InputNumber style={{ width: '100%' }} defaultValue={text} prefix="￥" suffix="万円" />
      </>,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="削除しますか?" onConfirm={() => handleDelete(record.key)}>
            <a>削除</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: `新しい罪状 ${count}`,
      name: `新しい罪状 ${count}`,
      number: 50,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const onFinish = () => {
    const names = curSource.map((item) => item.name);
    let sum = 0;
    curSource.forEach((item:any) => {
      sum += parseInt(item.number);
    });
    let date = new Date();
    const dateStr = date.getHours() + 2 + '時' + date.getMinutes() + '分' + date.getSeconds() + '秒';
    const str = `${'指名手配：' + '\n' +
      '罪状：' + names + '\n' +
      '合計金額：' + sum + '万円\n' +
      '時間：' + dateStr + 'まで\n'
      }  `
    console.log('str', str);
    setCurrentText(str)
  }

  const rowSelection = {
    onChange: ( _:any,selectedRows: DataType[]) => {
      setCurSource(selectedRows)
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  return (
    <div className='home-pnumber'>
      <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
        <Col span={24}>

          <Card
            title={<h2>指名手配文案生成ツール</h2>}
            extra={
              <Button type="primary" style={{ backgroundColor: 'black' }} icon={<PlusOutlined />} onClick={handleAdd} />
            }>
            <Table
              size='small'
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              } as any}
              components={components}
              rowClassName={() => 'editable-row'}
              rowKey={item => item.key}
              bordered
              dataSource={dataSource}
              columns={columns as any}
              pagination={false}
            />
            <Button type="primary" style={{ backgroundColor: 'black', marginTop: 20 }}
              onClick={onFinish}
            >生成</Button>
          </Card>
        </Col>
        <Col span={24}>
          <TextArea
            placeholder="ここで文案を生成してます。犯罪者の名前はありません。"
            allowClear
            autoSize={{ minRows: 5 }}
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default App;