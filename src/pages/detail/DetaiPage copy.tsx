import React, { useState, useEffect } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
import axios from 'axios'
import { Spin, Row, Col, Divider, Typography, Anchor, Menu } from 'antd'
import styles from './DetaiPage.module.css'
import { Header, Footer, ProductIntro, ProductComments } from '../../components'
import { DatePicker, Space } from 'antd'
import { commentMockData } from './mockup'

const { RangePicker } = DatePicker

interface MatchParams {
  touristRouteId: string
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
  const { touristRouteId } = useParams<MatchParams>()
  const [loading, setLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        )
        setProduct(data)
        setLoading(false)
      } catch (error: any) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
        }}
      />
    )
  }
  if (error) {
    return <div>网站出错：{error}</div>
  }
  console.log('>>>>product', product)
  return (
    <>
      <Header />
      <div className={styles['page-content']}>
        {/* 产品简介 与 日期选择 */}
        <div className={styles['product-intro-container']}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <Anchor className={styles['product-detail-anchor']}>
          {/* 主要是各Anchor.Link 指向那个id */}
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Anchor.Link href="#fees" title="费用"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>
        {/* 产品特色 */}
        <div id="feature" className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          {/* React中特殊处理html元素的处理机制：dangerouslySetInnerHTML，防止注入攻击，不能直接渲染 */}
          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 费用 */}
        <div id="fees" className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>费用</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 预订须知 */}
        <div id="notes" className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 商品评价*/}
        <div id="comments" className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>用户评价</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}