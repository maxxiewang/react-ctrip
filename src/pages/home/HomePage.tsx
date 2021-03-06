import React, { Component } from 'react'
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
} from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import styles from './HomePage.module.css'
import { withTranslation, WithTranslation } from 'react-i18next'
import { t } from 'i18next'
import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import { getDataActionCreator } from '../../redux/recommendProducts/recommendProductsActions'
import { MainLayout } from '../../layouts/mainLayout'
/* 
  connect函数中传入两个参数 mapStateToProps, mapDispatchToProps,
  两个函数分别连接的是state与Action的dispatch方法，
  他们所连接的对像都可以绑定在props属性中，这样在Props里面就可以使用了
*/
const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList,
  }
}
// 引入三个action工厂函数，这里面直接return一个对象
const mapDispatchToProps = (dispatch) => {
  // 返回类型中，每一个字段，就是一个dispatch处理函数
  return {
    getData: () => {
      dispatch(getDataActionCreator())
    },
  }
}

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>
class HomePageComponent extends Component<PropsType> {
  componentDidMount() {
    //! 可以和原来的用自己的state对比一下，范型那个PropsType有点难理解，其他还行
    this.props.getData()
  }
  render() {
    // const { t } = this.props
    // console.log('t??', t) // 直接就可以得到这个t函数
    // const { productList, loading, error } = this.state
    //! 最后组件就变成了prpos与redux-store进行相关，各组件不需要再维护自己的state
    const { productList, loading, error } = this.props
    if (loading) {
      return (
        <div>
          <Spin
            style={{
              marginTop: 200,
              marginBottom: 200,
              margin: '0,auto',
              width: '100%',
            }}
          />
        </div>
      )
    }
    if (error) {
      return <div>请求错误。。。</div>
    }
    return (
      <MainLayout>
        {/* 页面内容 */}
        <div className={styles['page-content']}>
          <Row style={{ marginTop: 20 }}>
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
            products={productList[0].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t('home_page.new_arrival')}
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList[1].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                {t('home_page.domestic_travel')}
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList[2].touristRoutes}
          />
          <div>
            <h3>
              <b style={{ color: 'red' }}>合作企业部分待开发。。。。。</b>
            </h3>
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default HomePageComponent

//! 这里面就是使用with高阶函数来实现语言配置的注入
//! 所以绑定的这两个函数，一个是state控制数据的流入，一个dispatch控制数据的流出

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePageComponent))
