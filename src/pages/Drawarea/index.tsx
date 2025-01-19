import React, { useEffect, useRef, useState, useMemo } from 'react';
import { message } from 'antd';
// import JSMpeg from 'jsmpeg-player';
import { fabric } from 'fabric';
import './index.less'; 

// rgba颜色转换为半透明
function setHalfOpacity(rgbaString:string) {
  // 验证rgbaString是否符合rgba(r,g,b,a)的格式  
  // 这里只做了简单的验证，可能需要更严格的验证逻辑  
  if (!/^rgba\(\d+,\d+,\d+,(0\.\d{1,2}|1(?:\.0{1,2})?)\)$/.test(rgbaString)) {
    throw new Error('Invalid rgba string format');
  }

  // 使用正则表达式提取RGB值和alpha值  
  const [ red, green, blue, alpha] = rgbaString.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(0\.\d+|1(?:\.0{1,2})?)\)$/);
  return `rgba(${red}, ${green}, ${blue}, 0.3)`;
}  

export default function App(props: any) {
  const { data, streamUrl, style } = props
  const divCanvas = useRef<HTMLDivElement | null>(null)
  const baseCanvas = useRef<HTMLCanvasElement | null>(null)

  const [width, setWidth] = useState(style?.width || 1280)
  const [height, setHeight] = useState(style?.height || 720)

  // 等比例缩放
  function equalScale(e: any, box, dir: 'width' | 'height') {
    if (box[dir]) {
      if (dir === 'width') {
        return e * width / box[dir];
      } else {
        return e * height / box[dir];
      }
    }
    return e
  }

  // 处理多边形
  function handlePolygon(canvas, data) {
    const { key, points, box, color } = data;
    const newPoints = points.map((item) => {
      return {
        x: equalScale(item.x, box, 'width'),
        y: equalScale(item.y, box, 'height')
      }
    })

    // 多边形
    const polygon = new fabric.Polygon(
      newPoints, // 顶点坐标集
      {
        stroke: color, // 边框色
        fill: setHalfOpacity(color.split(/\s+/).join('')),  // 填充色
        strokeWidth: 1, // 边框粗细
        objectCaching: false, // 当“true”时，对象缓存在另一个画布上。当“false”时，除非必要(clipPath)默认为 true，否则不缓存对象。默认是true
        selectable: false, // 禁止选中
        evented: false, // 当设置为“false”时，对象不能成为事件的目标。所有事件都会通过它传播。
        pid: `polygon-${key}`, // 唯一标识
      }
    )
    canvas.add(polygon)
  }
  // 处理文本
  function handleIText(canvas, data) {
    const { key, text, points, box, color } = data;
    const iText = new fabric.IText(
      text,
      {
        left: equalScale(points.x, box, 'width'),
        top: equalScale(points.y, box, 'height'),
        fill: color,
        fontSize: 30,
        textAlign: 'center',
        tid: `text-${key}` // 自定义属性
      })

    canvas.add(iText);
  }

  /* 标注回显 */
  const init = (canvas, source) => {
    source.forEach((item) => {
      if (item.type === 'text') handleIText(canvas, item);
      else if (item.type === 'polygon') handlePolygon(canvas, item);
    });
  }


  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        setWidth(Math.round(width));
        setHeight(Math.round(height));
      });
    });

    if (divCanvas.current) {
      resizeObserver.observe(divCanvas.current);
    }
    return () => {
      if (divCanvas.current) {
        resizeObserver.unobserve(divCanvas.current);
      }
    };
  }, []); // 只在组件挂载和卸载时执行

  useMemo(() => {
    // 重新绘制标注区域
    requestAnimationFrame(() => {
      const source = []
      if (data) {
        data.forEach(item => {
          if (item?.position) source.push(...item.position)
        })
      }
      const canvas = new fabric.Canvas('canvas-2')
      init(canvas, source);
    });
  }, [width, height]);

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas-2')
    const source = []
    if (data) {
      data.forEach(item => {
        if (item?.position) source.push(...item.position)
      })
    }

    init(canvas, source);
    return () => { canvas.clear(); }
  }, [data])

  return (
    <div className='canvas-wrapper' ref={divCanvas}>
      <canvas
        ref={baseCanvas}
        id="canvas-1"
        // style={{ width: width + 'px', height: height + 'px' }}
        style={{ width: '100%', height: '100%' }}
      >Canvas not supported</canvas>

      <canvas
        id="canvas-2"
        width={width}
        height={height}
        style={{
          // border: '1px solid #ccc',
          width: '100%', height: '100%'
        }}
      >Canvas not supported</canvas>
    </div>
  );
}