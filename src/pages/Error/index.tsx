import { Button, Result, Image, Card } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { localPath } from '@/const';
import icon from '@/assets/icon.svg';
import './index.less'

const NotFoundPage = () => {
    const { pathname } = useLocation();

    return (
        <div className='home-page'>
            <Card style={{width:'90%'}}>
                <Result
                    icon={
                        <img
                            width={200}
                            height={200}
                            src={icon}
                        />
                    }
                    title={<h2>404</h2>}
                    subTitle={`页面不存在, 当前路由: ${pathname}`}
                    extra={
                        <Button type="primary">
                            <Link to={localPath}>返回首页</Link>
                        </Button>
                    }
                />
            </Card>
        </div>
    );
};

export default NotFoundPage;
