import React from 'react'
import { useCurrency } from '../context/context'
import {Button,Input,} from "antd" // UI Lib
function ButtonList() {
  const {AscendingPrice,filterFunc} = useCurrency() //context

  return (
    <>
    <div style={{display:'flex',flexDirection:'row',justifyContent:"space-between",alignContent:'center'}}>  {/*Hizalamak için root  div*/ } 
   <div style={{display:'flex',flexDirection:'row',justifyContent:"center",alignContent:'center'}}>  {/*Hizalamak için div*/ }
    <h2 style={{fontSize:`1rem`,marginRight:`10px`}}> Koda Gore Filtre: </h2>  {/*Input belirginligi arttirmasi icin text*/ }
    <Input style={{display:"inline",width:`250px`}}     type="text"  onChange={(e)=>filterFunc(e)}/>  {/*Input*/ }
   </div>
   <Button style={{display:"inline",marginRight:"250px"}} onClick={AscendingPrice}>Fiyata Gore Listele</Button>  {/*Fiyat Listeme Buttonu*/ }

   </div>
   </>
  )
}

export default ButtonList