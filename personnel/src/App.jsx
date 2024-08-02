// App.jsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import DashboardHyg from './Components/DashboardHyg';
import DashboardPers from './Components/DashboardPers';
import EmployeeList from './Components/EmployeeList';
import AddEmployee from './Components/AddEmployee';
import Visites from './Components/Visites';
import TestCopro from './Components/TestCopro';
import VisitesList from './Components/VisitesList';
import VisitEmployees from './Components/VisitEmployees'; 
import CoproList from './Components/CoproList';
import CoproEmployee from './Components/CoproEmployee';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboardHyg" element={<DashboardHyg />} />
          <Route path="/dashboardPers" element={<DashboardPers />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/visites" element={<Visites />} />
          <Route path="/testCopro" element={<TestCopro/>} />
          <Route path="/visits-list" element={<VisitesList />} />
          <Route path="/copro-list" element={<CoproList/>} /> {/* Assurez-vous que cette route est correcte */}
          <Route path="/visits/:visitId/employees" element={<VisitEmployees />} />
          <Route path="/testCopro/:testId/employees" element={<CoproEmployee />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;