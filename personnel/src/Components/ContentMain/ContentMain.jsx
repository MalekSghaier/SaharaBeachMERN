import "./ContentMain.css";
import Cards from "../Cards/Cards";
import Transactions from "../Transactions/Transactions";
import Report from "../Report/Report";
const ContentMain = () => {
  return (
    <div className="main-content-holder">
        <div className="content-grid-one">
            <Cards />
            <Transactions />
            <Report />
        </div>
        
    </div>
  )
}

export default ContentMain
