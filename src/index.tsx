import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css' // 全局引用antd
import './i18n/configs'
//! 使用Provider引入store
import { Provider } from 'react-redux'
// 这个rootStore就相当于包含了store和persistor
import rootStore from './redux/store'
//这样redux-stroe可以在全局范围内使用了
import axios from 'axios'
import { PersistGate } from 'redux-persist/integration/react'

axios.defaults.headers['x-icode'] = 'D3A793E1C19D1147'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate loading={null} persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
