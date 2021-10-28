import React, { Component } from 'react'
import {Header, Footer, Carousel, SideMenu, ProductCollection} from '../../components'
import {Row,Col, Typography} from 'antd'
import { productList1, productList2, productList3 } from "./mockups";
import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import styles from './HomePage.module.css'


export class HomePage extends Component {
  render() {
    return (
      <div>
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
      <ProductCollection
          title={
            <Typography.Title level={3} type="warning">
              热门推荐
            </Typography.Title>
          }
          sideImage={sideImage}
          products={productList1}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="danger">
              新品上市
            </Typography.Title>
          }
          sideImage={sideImage2}
          products={productList2}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="success">
              国内游推荐
            </Typography.Title>
          }
          sideImage={sideImage3}
          products={productList3}
        />
        <div><h3><b style={{color:'red'}}>合作企业部分待开发。。。。。</b></h3></div>
      </div>
      <Footer/>
      </div>
    )
  }
}
