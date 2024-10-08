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
import Layout from './Components/Layout';
import Logout from './Components/Logout'; 
import AnalyseBacterio from './Components/AnalyseBacterio';
import BacterialAnalysisForm from './Components/BacterialAnalysisForm';
import NonConformite from './Components/NonConformite';
import PlanAction from './Components/PlanAction';
import AddPlanForm from './Components/AddPlanForm';   
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboardHyg" element={<Layout><DashboardHyg /></Layout>} />
          <Route path="/dashboardPers" element={<Layout><DashboardPers /></Layout>} />
          <Route path="/employeeList" element={<Layout><EmployeeList /></Layout>} />
          <Route path="/add-employee" element={<Layout><AddEmployee /></Layout>} />
          <Route path="/visites" element={<Layout><Visites /></Layout>} />
          <Route path="/testCopro" element={<Layout><TestCopro /></Layout>} />
          <Route path="/visits-list" element={<Layout><VisitesList /></Layout>} />
          <Route path="/copro-list" element={<Layout><CoproList /></Layout>} />
          <Route path="/visits/:visitId/employees" element={<Layout><VisitEmployees /></Layout>} />
          <Route path="/testCopro/:testId/employees" element={<Layout><CoproEmployee /></Layout>} />
          <Route path="/logout" element={<Logout />} />
          <Route path = "/AnalyseBacterio" element={<Layout>< AnalyseBacterio/> </Layout>} />
          <Route path = "/AjoutAnalyseBacterio" element={<Layout>< BacterialAnalysisForm/></Layout>}/>
          <Route path = "/NonConformite" element={<Layout>< NonConformite/></Layout>}/>
          <Route path ="/PlanAction" element={<Layout>< PlanAction/></Layout>} />
          <Route path="/add-plan" element={<Layout><AddPlanForm /></Layout>} /> {/* Add this line for the AddPlanForm route */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
