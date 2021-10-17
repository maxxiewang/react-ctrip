import React from 'react';
import styles from "./App.module.css";
import {Header, Footer, Carousel, SideMenu} from './components'
import {Row,Col} from 'antd'

function App() {
  return (
    <div className={styles.App}>
      <Header/>
      {/* 页面内容 */}
      <div className={styles['page-content']}>
      <Row style={{marginTop:10}}>
        <Col span={6}>
          <SideMenu />
        </Col>
        <Col span={18}>
          <Carousel />
        </Col>
      </Row>
      </div>
      <Footer/>      
    </div>
  );
}

export default App;
