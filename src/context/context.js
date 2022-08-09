import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios" // api Lib


const currencyContext = createContext( ) // component istediginiz icin Context yaratarak devam ettim.

const CurrencyProvider =({children}) =>{
const [date,setDate] = useState() // Madem data cekerken tarihde veriyor alalim :)
const [currency,setCurrency]= useState(null) // Gunluk kurun gercek tablosu
const [filteredData,setFilteredData] = useState(null) // Gunluk kurun filtlerenmis tablosu tablosu
const [filterStatus,setFilterStatus] =useState(false) // fiyatlari assagi yukari yaparken tersine cevirmek icin.
 useEffect(()=>{
   if(currency==null || currency== undefined){
       (async ()=>{ // use effectin icinde anonim async olmasini sebebi en saglikli datayi boyle cekebiliriz
           let  {data}  =  await axios('https://api.factmaven.com/xml-to-json/?xml=https://www.tcmb.gov.tr/kurlar/today.xml') // axios ile cekiyorum tabi internetten buldugum api sayesinde direk xml i bana json veriyor.
        await   setCurrency(data?.Tarih_Date.Currency) // baslangicda  bilerek datayi set liyorumki normal useeffect tetiklensin boylece apide ilk cekiste sorun cikarsa 2. 3. yu denesin.
       await    setDate(data?.Tarih_Date.Date)
           })()}},[])  

useEffect(()=>{
 if(currency==null || currency== undefined){ // ilk basta null veya undefined gelmesi durumunda tekrarlamasini istiyorum 
    (async ()=>{
        let  {data} = await axios.get( `https://api.factmaven.com/xml-to-json/?xml=https://www.tcmb.gov.tr/kurlar/today.xml`) 
        setCurrency(data.Tarih_Date.Currency)
        setDate(data.Tarih_Date.Date)
        setFilteredData(data.Tarih_Date.Currency) // filtreli datayida burada orjinal data ile giriyorum yoksa sayfada hic birsey goremezsiniz.
        })()}
    },[currency])  

const AscendingPrice = ()=>{
let  x = filteredData.sort((a,b)=>parseFloat(a.ForexBuying) - parseFloat(b.ForexBuying))  // a-b yaptiginda eger pozitifse a kaliyor negatif cikarsa b geciyor yerine boylece siralaniyor.
setFilterStatus(!filterStatus) // surekli tersine yapmak icin burda bool u tersine ceviriyorum
if (!filterStatus) setFilteredData([...x])
if (filterStatus) setFilteredData([...x].reverse()) //tersduz
}

const filterFunc = (e)=>{
if(e.target.value ==``) setFilteredData(currency) // inputta birsey yazili degilse tum datayi getirsin diye
setFilteredData(currency.filter(item => item.Kod.includes(`${e.target.value.toUpperCase()}`))) // currenydeki her datanin icindeki elementlere su karakterden sizde varmi diye soruyorum true gelirse sadece onu gosteriyor ekranda.
}
 const columns = [ // tablo icin hazir lib kullaniyorum  buda tablonun stun basliklari
    {
      title: 'CrossOrder', // tabloda gozukecek isim
      dataIndex: 'CrossOrder', // gelen objedeki data adi
      key: 'CrossOrder',
    },
    {
      title: 'CurrencyCode',
      dataIndex: 'CurrencyCode',
      key: 'CurrencyCode',
    },
    {
      title: 'Unit',
      dataIndex: 'Unit',
      key: 'Unit',
    },
    {
      title: 'Name',
      dataIndex: 'Isim',
      key: 'Isim',
    },
    {
      title: 'Buy',
      dataIndex: 'ForexBuying',
      key: 'ForexBuying',
    },
    {
      title: 'Sell',
      dataIndex: 'ForexSelling',
      key: 'ForexSelling',
    },
    ];
const values ={columns,filteredData,setCurrency,date,setDate,AscendingPrice,filterFunc}
return(
<div>
<currencyContext.Provider    value={ values} >{children}</currencyContext.Provider> {/*Context.Provider i app yerinde burada yazip daha anlasilir kod yapiyorum childeren bu fonksiyonun altindaki tum objeler*/}
</div>
)
}

const useCurrency = () => useContext(currencyContext) /* context hook yaratiyorum */ 

export {CurrencyProvider,useCurrency}



