import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
//! useSelector主要还是用于连接store，获得语言与语言列表，（引入自定义的hooks函数，主要是为了TS的类型匹配）
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import {
  changeLanguageActionCreator,
  addLanguageActionCreator,
} from '../../redux/language/languageActions'
//! 函数式组件的i18n国际和类式组件不一样，但更简单
import { useTranslation } from 'react-i18next'

/* 
 这个分支主要演示的就是7-10将react-redux在函数式组件中的用法，核心就是利用hooks实现
 store的订阅与action的分发。
*/
export const Header: React.FC = () => {
  /* 函数式组中使用hooks传递路由数据 */
  const history = useHistory()
  //! 注意观察这个RootState加上后的作用，language直接映身为 zh | en
  //! 使用useSelector是自定义的那个，注意看代码提示
  const language = useSelector((state) => state.language.language)
  const languageList = useSelector((state) => state.language.languageList)
  // useDispatch() 的输出，就是dispatch函数本身。连接着的就是store的分发函数，action就利用这个dispatch函数来分发出去
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const changeLanguage = (e) => {
    if (e.key === 'addLanguage') {
      // this.props.addLanguage('kr', '韩文')
      const action = addLanguageActionCreator('kr', '韩文')
      dispatch(action)
    } else {
      // this.props.changeLanguage(e.key)
      dispatch(changeLanguageActionCreator(e.key))
    }
  }
  return (
    <div className={styles['app-header']}>
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>啊~象牙山</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={changeLanguage}>
                {languageList.map((item) => {
                  return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                })}
                <Menu.Item key={'addLanguage'}>添加新语言</Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language}
          </Dropdown.Button>
          <Button.Group className={styles['button-group']}>
            <Button onClick={() => history.push('/register')}>
              {t('header.register')}
            </Button>
            <Button onClick={() => history.push('/signIn')}>
              {' '}
              {t('header.signin')}
            </Button>
          </Button.Group>
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <span
          onClick={() => {
            history.push('/')
          }}
        >
          <img src={logo} alt="logo" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>
            CyberTrip
          </Typography.Title>
        </span>
        <Input.Search
          placeholder={'请输入旅游目的地、主题、或关键字'}
          className={styles['search-input']}
          onSearch={(keywords) => history.push('/search/' + keywords)}
        />
      </Layout.Header>
      <Menu mode={'horizontal'} className={styles['main-menu']}>
        <Menu.Item key="1"> {t('header.home_page')} </Menu.Item>
        <Menu.Item key="2"> {t('header.weekend')} </Menu.Item>
        <Menu.Item key="3"> {t('header.group')} </Menu.Item>
        <Menu.Item key="4"> {t('header.backpack')} </Menu.Item>
        <Menu.Item key="5"> {t('header.private')} </Menu.Item>
        <Menu.Item key="6"> {t('header.cruise')} </Menu.Item>
        <Menu.Item key="7"> {t('header.hotel')} </Menu.Item>
        <Menu.Item key="8"> {t('header.local')} </Menu.Item>
        <Menu.Item key="9"> {t('header.theme')} </Menu.Item>
        <Menu.Item key="10"> {t('header.custom')} </Menu.Item>
        <Menu.Item key="11"> {t('header.study')} </Menu.Item>
        <Menu.Item key="12"> {t('header.visa')} </Menu.Item>
        <Menu.Item key="13"> {t('header.enterprise')} </Menu.Item>
        <Menu.Item key="14"> {t('header.high_end')} </Menu.Item>
        <Menu.Item key="15"> {t('header.outdoor')} </Menu.Item>
        <Menu.Item key="16"> {t('header.insurance')} </Menu.Item>
      </Menu>
    </div>
  )
}
