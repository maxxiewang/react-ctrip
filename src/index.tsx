import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css' // 全局引用antd
import './i18n/configs'
//! 使用Provider引入store
import { Provider } from 'react-redux'
import store from './redux/store'
//这样redux-stroe可以在全局范围内使用了
import axios from 'axios'

axios.defaults.headers['x-icode'] = 'D3A793E1C19D1147'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
