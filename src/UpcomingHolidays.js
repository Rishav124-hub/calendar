import React, { Component , useState} from "react";
import './PassedHolidays.css';

class UpcomingHolidays extends Component{

    state={
        loading :true,
        Data: null,
        currentDateTime: Date().toLocaleString(),
        on:false

      };
  
    async componentDidMount(){
      const url ="https://calendarific.com/api/v2/holidays?country=IN&year=2019&api_key=1bdeec04be6a3d87e3bc663f16d62a9bead28a6a";
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        Data: data.response.holidays,loading: false});
      console.log(data.response.holidays);
    }

    // const [modalIsOpen, setModalIsOpen] = React.useState(false)
    closeme=()=>{
        document.getElementById("content").style.display="none";
   }
    clickme=(value)=>{
        const month=["January","February","March","April","May","June","July","August","September","October","November","December"];
        document.getElementById("content").style.display="block";
        document.getElementById("content").innerHTML='<div className="inner-container"><p>'+this.state.Data[value].date.datetime.day+' '+
        month[this.state.Data[value].date.datetime.month-1]+' ' + this.state.Data[value].date.datetime.year+'<p>'+
        '<p>'+this.state.Data[value].name+'</p><div>'+this.state.Data[value].type+'</div>'+
        '<p>'+this.state.Data[value].description+'</p>'+
        '<button onClick={this.closeme}>Close</button></div>';
    
    }
 
    
    
    render(){
        const month =["January","February","March","April","May","June","July","August","September","October","November","December"];
        
        return(
            <div>
                
                {this.state.loading || !this.state.Data ?(
                    <div>Loading......</div>
                ):(
                    <div className= " main-container-btn">
                        {this.state.Data.map((item ,i )=>
                            <button className="content-btn" onClick={()=>this.clickme(i)}>
                                {item.date.datetime.day}<br/>
                                {month[item.date.datetime.month-1]} 
                            </button>
                        )}
                        <div id="content">
                            
                        </div>
                    </div>
                    
                )}
            </div>
        )
    }
}

export default UpcomingHolidays;