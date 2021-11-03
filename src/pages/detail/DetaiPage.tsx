import React from "react";
import {RouteComponentProps} from 'react-router-dom'

interface MatchParams {
  touristRouteId:string
}

/* 泛型的泛型 */
export const DetailPage:React.FC<RouteComponentProps<MatchParams>> = (props)=>{

  return (
    <h1>Detail，路线ID为{props.match.params.touristRouteId}</h1>
  )
}