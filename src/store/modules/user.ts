// 用户相关状态管理
import { createSlice } from '@reduxjs/toolkit'

const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
        token: null,
        username: null
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        setUsername(state, action) {
            state.username = action.payload
        }
    }
})

const { setToken, setUsername } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步 获取登录token
// const fetchLogin = (loginForm) => {
//     return async (dispatch) => {
//         // 1.发送异步请求
//         const token = await { '22': '33' }
//         // 2.提交同步action进行token存储
//         dispatch(setToken(token))
//     }
// }

export { setToken, setUsername }
export default userReducer