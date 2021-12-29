import React from 'react'
import styles from './ProductIntro.module.css'
import { Typography } from 'antd'

interface PropsType {
  title: string
  shortDescription: string
  price: string | number
  coupons: string
  points: string
  discount: string
  rating: string | number
  pictures: string[]
}

const ProductIntro: React.FC<PropsType> = ({
  title,
  shortDescription,
  price,
  coupons,
  points,
  discount,
  rating,
  pictures,
}) => {
  return (
    <div className={styles['intro-container']}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text>{shortDescription}</Typography.Text>
      <div className={styles['intro-detail-content']}>
        <Typography.Text style={{ marginLeft: 20 }}>
          $ <span className={styles['intro-detail-strong-text']}>{price}</span>
          /人起
        </Typography.Text>
        <Typography.Text style={{ marginLeft: 50 }}>
          <span className={styles['intro-detail-strong-text']}>{points}</span>分
        </Typography.Text>
      </div>
    </div>
  )
}
