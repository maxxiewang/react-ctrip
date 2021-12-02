import React, { Component } from 'react'
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
} from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
import { productList1, productList2, productList3 } from './mockups'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import styles from './HomePage.module.css'
import { withTranslation, WithTranslation } from 'react-i18next'
import axios from 'axios'

interface State {
  loading: boolean
  error: string | null
  productList: any[]
}

class HomePageComponent extends Component<WithTranslation, State> {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      loading: true,
      error: null,
    }
  }

  async componentDidMount() {
    // axios
    //   .get(
    //     'https://mock.mengxuegu.com/mock/61a78040c6b34465f53db98f/reactTrip/api/productCollections'
    //   )
    //   .then((res) => {
    //     console.log('res>>', res.data.data)
    //     this.setState({
    //       productList: res.data.data,
    //     })
    //   })
    try {
      const { data } = await axios.get(
        'https://mock.mengxuegu.com/mock/61a78040c6b34465f53db98f/reactTrip/api/productCollections'
      )
      this.setState({
        productList: data.data,
      })
    } catch (error: any) {
      this.setState({
        error: error.messsage,
      })
    }
  }

  render() {
    // 在使用 i18n时，需要先传入i18n的TS定义，即前面的范型WithTranslation
    // t为一个函数 ， 在模板时，即直接用t()使用
    const { t } = this.props
    const { productList } = this.state
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

export const HomePage = withTranslation()(HomePageComponent) // 连续两个小括号
