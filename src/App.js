/*

Mehmet Yagiz Maktav 09/08/22 

Selamlar Hazır kütüphane olarak antd kullanmamin daha kolay olmasi ve
herhangi bir koşul koymadığınız için kullandım ama ellede responsive 
yapmami isterseniz yapabilirim  yapabilirim.
daha onceki responsive web tasarim uygulamalarindan : https://github.com/foxsnow38/digiFistJobTest burada bulabilirsiniz.

*/ 
import './App.css';
import {Table} from "antd" // https://www.npmjs.com/package/antd UI Lab
import 'antd/dist/antd.css';
import {useCurrency } from './context/context';
import ButtonList from './component/ButtonList';
function App() {
  const {filteredData,columns,AscendingPrice,filterFunc,date}  =useCurrency()
  return (
    <div className="App" id='App'>
      <Table id='akinTable'   dataSource={filteredData} columns={columns} bordered  title={() => `${date}`} // Table Responsive 
    footer={() =>  <ButtonList/>} />
    </div>
  );
}
export default App;


