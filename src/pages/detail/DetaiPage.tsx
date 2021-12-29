import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Spin, Row, Col, DatePicker, Space } from 'antd'
//! useParams用来取得URL中的路由参数
import { RouteComponentProps, useParams } from 'react-router-dom'
import { Header, Footer } from '../../components'
import styles from './DetaiPage.module.css'

interface MatchParams {
  touristRouteId: string
}

const { RangePicker } = DatePicker

/* 泛型的泛型 */
export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
  const { touristRouteId } = useParams<MatchParams>()
  const [loading, setLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  // 引入副作用钩子 useEffect
  useEffect(() => {
    const fetchData = async () => {
      // 先将loading设置为true，再发送API请求
      setLoading(true)
      try {
        //! 连续解构赋值+重命名
        const {
          data: { data: result },
        } = await axios.get(
          `https://mock.mengxuegu.com/mock/61a78040c6b34465f53db98f/reactTrip/api/touristRoutesCopy/${touristRouteId}`
        )
        // 请求成功时
        setLoading(false)
        setProduct(result)
      } catch (error: any) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [])
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
  // 处理网络错误的情况
  if (error) {
    return <div>请求错误。。。</div>
  }
  // TODO: 这个占位不写就报错
  return (
    <>
      <Header />
      <div className={styles['page-content']}>
        <div className={styles['product-intro-contaier']}>
          <Row>
            <Col span={13}>产品详情</Col>
            <Col span={11}>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <div className={styles['product-detail-container']}></div>
        {/* 产品特色 */}
        <div id="feature" className={styles['product-detail-container']}></div>
        {/* 费用 */}
        <div id="fees" className={styles['product-detail-container']}></div>
        {/* 预订需知 */}
        <div id="notes" className={styles['product-detail-container']}></div>
        {/* 商品评价 */}
        <div id="comments" className={styles['product-detail-container']}></div>
      </div>
      <Footer />
    </>
  )
}
