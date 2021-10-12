import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css'
import { Layout , Typography, Input } from 'antd'

function App() {
  return (
    <div className={styles.App}>
      <div>
        <Layout.Header>
          <img src={logo} alt="" className={styles['App-logo']}/>
          {/* 这个level={3} 是React提前定义好的，直接使用就行 */}
          <Typography.Title level={3}>CyberTrip</Typography.Title>
          <Input.Search placeholder="请输入关键字"></Input.Search>
        </Layout.Header>
      </div>
    </div>
  );
}

export default App;
