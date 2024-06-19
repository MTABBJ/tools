import { memo } from 'react'
import './index.less'

const Page2 = memo(() => {
  return (
    <>
      <div className="shell">
        <div className="content">
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
      </div>
      <h1>自动轮播图</h1>
    </>
  )
})

export default Page2