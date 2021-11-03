import React from 'react';
import styles from "./App.module.css";
import { BrowserRouter ,Route, Switch } from 'react-router-dom'
import { HomePage,SignInPage,Register,DetailPage } from './pages'

function App() {
  /* 
    一般的React路由套路就是，BrowserRouter + Switch + Route三件套
    Switch组件自动做短路处理，每次只渲染一条单独的路径
    在Route中使用component传递组件时，默认传递三个数据，history,location,match
    给URL中添加参数：1、使用？来引导参数 2、分段路由 /products/1314122
  */
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>      
          <Route path='/' exact component={HomePage} />{/* exact 精准匹配，短路处理 */}
          <Route path='/signIn' component={SignInPage}/>
          <Route path='/register' component={Register}/>
          <Route path='/detail/:touristRouteId' component={DetailPage}/>
          <Route render={()=><h1>404 not found</h1>}/>{/* 404页面的写法，永远是最后一个 */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
