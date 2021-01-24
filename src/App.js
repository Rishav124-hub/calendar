import React, { Component } from "react";
import "./App.css";
import PassedHolidays from "./PassedHolidays";
import UpcomingHolidays from "./UpcomingHolidays";
class App extends Component{

  state={
    
    tabtype: 'Upcoming'
  };
  //   api call
  
  toggleMe=(value)=>{
    this.setState({
        tabtype:value,   
    })
  };
  render(){
    return(
    
      <div className="main-container">  
        <div>NO Holiday</div>
        <div className="btns">
          <button className="btn" onClick={()=>this.toggleMe('Upcoming')}>Upcoming Holidays</button>
          <button className="btn" onClick={()=>this.toggleMe('Passed')}>Passed Holidays</button>
        </div>
        <div className="data-container">
          {
            this.state.tabtype==='Upcoming' && <UpcomingHolidays/>
          }
          {
            this.state.tabtype==='Passed' && <PassedHolidays/>
          }

        </div>
  
      </div>
    )
  }
}
export default App;