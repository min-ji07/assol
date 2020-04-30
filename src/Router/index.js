import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// include default template
import Header from "../Components/Header/index";

// include other
import WorkTableByGroup from "./Work/WorkTableByGroup";
import WorkTableByPersonal from "./Work/WorkTableByPersonal";
import WorkTableByRestDay from "./Work/WorkTableByRestDay";
import WorkTableByRestDayView from "./Work/WorkTableByRestDayView";
// import WorkTableResult from "./Work/WorkTableResult";
import WorkMain from "./Work/WorkMain";
import EmploymentMain from "./Employment/EmploymentMain";
import TestWithholdingTax from "./TestWithholding/TestWithholdingTax";
import WithholdingTax from "./Withholding/WithholdingTax";
import WithholdingDeclaration from "./Withholding/WithholdingDeclaration";
import ContractMain from "./Contract/ContractMain";
import SalaryInput from "./Salary/SalaryInput";
import Salary from "./Salary/Salary";
import UserInfo from "./User/UserInfo"; 
import UserManagement from "./User/UserManagement";
import useHook from "../GlobalState/Hooks/useHook";
import WorkTableByReplaceUser from "./Work/WorkTableByReplaceUser";
import LoginMain from "./Login/LoginMain";
import EmploymentApply from "./Employment/EmploymentApply";
import EmploymentHistory from "./Employment/EmploymentHistory";



const Routes = () => {
  const { state } = useHook();
  const urlName = window.location.pathname;

  if(urlName == "/"){
    return(
      <BrowserRouter>
        <Route path="/" component={LoginMain} />
      </BrowserRouter>
    )
  }
    return (
      <>
      <Header />
        <BrowserRouter>
        {state && state.branchNo!=0 && 
          <Switch>
            
            <Route path="/user/userInfo" component={UserInfo} />
            <Route path="/user/userManagement" component={UserManagement} />
            <Route path="/work/workTableMain" component={WorkMain} />
            <Route path="/work/workTableByGroup" component={WorkTableByGroup} />
            <Route path="/work/workTableByPersonal/:yearMonth" component={WorkTableByPersonal} />
            <Route path="/work/workTableByRestDay" component={WorkTableByRestDay}/>
            <Route path="/work/workTableByRestDayView" component={WorkTableByRestDayView} />
            <Route path="/employment/employmentMain" component={EmploymentMain} />
            <Route path="/testwithholding/testwithholdingTax" component={TestWithholdingTax} />
            <Route path="/withholding/withholdingTax" component={WithholdingTax} />
            <Route path="/withholding/withholdingDeclaration" component={WithholdingDeclaration} />
            <Route path="/contract/contractMain" component={ContractMain} />
            <Route path="/salary/salaryInput" component={SalaryInput} />
            <Route path="/salary/salary" component={Salary} />
            <Route path="/work/workTableByReplaceUser" component={WorkTableByReplaceUser} />
            <Route path="/employment/employmentApply" component={EmploymentApply} />
            <Route path="/employment/employmentHistory" component={EmploymentHistory} />
          </Switch>
        }
      </BrowserRouter>
      </>
    )
};


export default Routes;
