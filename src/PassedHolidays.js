import React, { Component , useState} from "react";
import  "./PassedHolidays.css";

class PassedHolidays extends Component{

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
      this.setState({Data: data.response.holidays ,loading: false});
      console.log(data.response.holidays);
    }

    // const [modalIsOpen, setModalIsOpen] = React.useState(false)
    
    clickme=()=>{

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
                            <button className="content-btn" vlaue="" onClick={()=>this.clickme('{item.date.datetime.day}')}>
                                {item.date.datetime.day}<br/>
                                {month[item.date.datetime.month-1]} 
                            </button>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default PassedHolidays;