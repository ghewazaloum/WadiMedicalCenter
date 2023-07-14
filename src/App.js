import './App.css';
import {Container} from './components/index'
import {Login,Home,AllDoctors,Redirect,DoctorReservedAppoinments,EditAppoinments,Devices,
DevicesReservedAppointments,Patients,PatientAppointments,EditDeviceAppointments,
DoctorsAppManager,AddDoctor,AddTherapist,DeviceAppManager,AddDevice,Offers,EditDoctor,
EditTherapist,EditDevice,EditPatient,AddOffer,Statistics} from './Pages/index'
import { IconBar } from './Sections/index'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'


function App() {
  return (
    <div className='App'>
        <Router>
        <IconBar/>
        <Container>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/AllDoctors' element={<AllDoctors/>}/>
            <Route path='/DoctorReservedAppoinments' element={<DoctorReservedAppoinments/>}/>
            <Route path='/EditAppoinments' element={<EditAppoinments/>}/>
            <Route path='/Devices' element={<Devices/>}/>
            <Route path='/DevicesReservedAppointments' element={<DevicesReservedAppointments/>}/>
            <Route path='/Patients' element={<Patients/>}/>
            <Route path='/PatientAppointments' element={<PatientAppointments/>}/>
            <Route path='/EditDeviceAppointments' element={<EditDeviceAppointments/>}/>
            <Route path='/DoctorsAppManager' element={<DoctorsAppManager/>}/>
            <Route path='/AddDoctor' element={<AddDoctor/>}/>
            <Route path='/AddTherapist' element={<AddTherapist/>}/>
            <Route path='/DeviceAppManager' element={<DeviceAppManager/>}/>
            <Route path='/AddDevice' element={<AddDevice/>}/>
            <Route path='/Offers' element={<Offers/>}/>
            <Route path='/EditDoctor' element={<EditDoctor/>}/>
            <Route path='/EditTherapist' element={<EditTherapist/>}/>
            <Route path='/EditDevice' element={<EditDevice/>}/>
            <Route path='*' element={<Redirect/>}/>
            <Route path='/EditPatient' element={<EditPatient/>}/>
            <Route path='/Statistics' element={<Statistics/>}/>
            <Route path='/AddOffer' element={<AddOffer/>}/>
            </Routes>
        </Container>
        </Router>
        </div>
  );
}

export default App;
