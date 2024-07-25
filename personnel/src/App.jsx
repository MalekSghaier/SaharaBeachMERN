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
import Copro from './Components/Copro';
import VisitesList from './Components/VisitesList';
import VisitEmployees from './Components/VisitEmployees'; // Import the new component

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
          <Route path="/add-employee" element={<AddEmployee/>} />
          <Route path="/visites" element={<Visites/>} />
          <Route path="/copro" element={<Copro/>} />
          <Route path="/visits-list" element={<VisitesList/>} />
          <Route path="/visits/:visitId/employees" element={<VisitEmployees/>} /> {/* Add this line */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
