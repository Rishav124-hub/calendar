import React, { Component } from "react";
import "./App.css";
import PassedHolidays from "./PassedHolidays";
import UpcomingHolidays from "./UpcomingHolidays";
class App extends Component{

  state={
    tabtype: 'Upcoming',
    loading :true,
    Data: null,
    on:false,
    Message:"No Holiday Today",
    // current date time
    currentDateTime:new Date().toLocaleDateString(),
    currentDay:new Date().toLocaleDateString().split('/')[1],
    currentMonth:new Date().toLocaleDateString().split('/')[0],
    currentYear:new Date().toLocaleDateString().split('/')[2],
  };
  //   api call
  async componentDidMount(){
    const url ="https://calendarific.com/api/v2/holidays?country=IN&year=2021&api_key=633e1b568bf333902e4da88af99852664097bfdb";
    const response = await fetch(url);
    const data = await response.json();
    if(this.state.currentMonth<10){
      this.setState({
          Data: data.response.holidays,
          loading: false,
          currentDateTime:this.state.currentYear + '-' + '0' + this.state.currentMonth + '-' + this.state.currentDay
          });
      }else{
          this.setState({
              Data: data.response.holidays,
              loading: false,
              currentDateTime:this.state.currentYear + '-' +this.state.currentMonth + '-' + this.state.currentDay
              });
      }
      var passedData=[]
      var j=0
      for(var i=0; i<this.state.Data.length;i++){
          if(this.state.Data[i].date.iso===this.state.currentDateTime){
              passedData[j]=this.state.Data[i]
              j++
              console.log("Data",passedData)
              this.setState({
                Message: "Hey,you got Holiday today."
              })    
          }    
      }
      this.setState({
          Data: passedData,
      })
  }
  
  toggleMe=(value)=>{
    this.setState({
        tabtype:value,   
    })
  };
  render(){
    const month =["January","February","March","April","May","June","July","August","September","October","November","December"];    
    return(
      <div className="main-container">
        
          {
            (this.state.Message==="No Holiday Today")?(
              <div>{this.state.Message}</div>
            ):(
              <div>
                <p>{this.state.Message}</p>
                <p>{this.state.currentDay} {month[this.state.currentMonth-1]} {this.state.currentYear}</p>
                {
                  this.state.Data.map((item)=>
                    <div>
                      <div>{item.name}</div>
                      <div>{item.type}</div>
                    </div>
                  )
                }
              </div>
            )
          }
        
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