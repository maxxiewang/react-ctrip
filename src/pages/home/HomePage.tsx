import React, { Component } from 'react'
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
} from '../../components'
import { Row, Col, Typography } from 'antd'
import { productList1, productList2, productList3 } from './mockups'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import styles from './HomePage.module.css'
import axios from 'axios'
import { withTranslation, WithTranslation } from 'react-i18next'
import { t } from 'i18next'

// 给组件的state定义接口
interface State {
  productList: any[]
}
class HomePageComponent extends Component<WithTranslation, State> {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
    }
  }
  async componentDidMount() {
    const { data } = await axios.get(
      'https://mock.mengxuegu.com/mock/61a78040c6b34465f53db98f/reactTrip/api/productCollections'
    )
    this.setState({
      productList: data.data,
    })
  }
  render() {
    // const { t } = this.props
    // console.log('t??', t) // 直接就可以得到这个t函数
    return (
      <div>
        <Header />
        {/* 页面内容 */}
        <div className={styles['page-content']}>
          <Row style={{ marginTop: 10 }}>
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
                {t('home_page.hot_recommended')}
              </Typography.Title>
            }
            sideImage={sideImage}
            products={productList1}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t('home_page.new_arrival')}
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList2}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                {t('home_page.domestic_travel')}
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList3}
          />
          <div>
            <h3>
              <b style={{ color: 'red' }}>合作企业部分待开发。。。。。</b>
            </h3>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default HomePageComponent

// 这是一个正常注释
//? 表求有点疑问
//todo 这是一个待办
//! 这里面就是使用with高阶函数来实现语言配置的注入
export const HomePage = withTranslation()(HomePageComponent)
