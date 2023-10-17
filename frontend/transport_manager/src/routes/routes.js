import react from 'react' 
import {Routes , Route , Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/login'
import Signup from '../pages/signUp'
import AddNewBus from '../pages/addNewBus'
import BusTimetable from '../pages/busTimetable'
import Price from '../pages/routeprice'
import UpdateBus from '../pages/updateBus'
import BusDetails from '../pages/busDetails'


const Routers = () =>{
    return(
        <Routes>
            <Route path='/' element={<Navigate to ='/Signup'/>}/>
            <Route path='/home' element={<Home/>}/>

            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>

            <Route path='/addNewbus' element={<AddNewBus/>}/>
            <Route path='/busTimetable' element={<BusTimetable/>}/>
            <Route path='/update/:id' element={<UpdateBus/>}/>
            <Route path='/view/:id' element={<BusDetails/>}/>

            <Route path='/price' element={<Price/>}/>
                        
        </Routes>
    )
}

export default Routers ;