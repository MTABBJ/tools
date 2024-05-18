import React, { memo, useEffect, useRef } from 'react'
import { loadOml2d } from 'oh-my-live2d'
import type { Options } from 'oh-my-live2d'

export interface Oml2dProps extends Options {}

const Oml2d: React.FC<Oml2dProps> = memo((props) => {
    const oml2dRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const oml2d = loadOml2d({
            mobileDisplay: true,
            models: [
                {
                    path: 'https://model.oml2d.com/HK416-1-normal/model.json',
                    position: [0, 60],
                    mobilePosition: [80, 80],
                    scale: 0.08,
                    mobileScale: 0.06,
                    stageStyle: {
                        height: 450,
                    },
                    mobileStageStyle: {
                        height: 370,
                        width: 400,
                    },
                    // showHitAreaFrames: true,
                },
            ],
            dockedPosition: 'right',
            ...props,
        });

        oml2d.onLoad((state) => {
            // switch (state) {
            //     case 'fail':
            //         console.log('加载失败');
            //         break;
            //     case 'success':
            //         console.log('加载成功');
            //         break;
            //     case 'loading':
            //         console.log('加载中');
            //         break;
            //     default:
            //         break;
            // }
            // console.log('onLoad')
        })
    }, [])

    return (
        <div ref={oml2dRef}></div>
    )
})

export default Oml2d