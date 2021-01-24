import React, { Component } from "react";
import './PassedHolidays.css';

class UpcomingHolidays extends Component{

    state={
        loading :true,
        Data: null,
        on:false,
        // current date time
        currentDateTime:new Date().toLocaleDateString(),
        currentDay:new Date().toLocaleDateString().split('/')[1],
        currentMonth:new Date().toLocaleDateString().split('/')[0],
        currentYear:new Date().toLocaleDateString().split('/')[2],
        UpcomingHoliday:null
      };
    //   api call
    async componentDidMount(){
      const url ="https://calendarific.com/api/v2/holidays?country=IN&year=2019&api_key=1bdeec04be6a3d87e3bc663f16d62a9bead28a6a";
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        Data: data.response.holidays,loading: false});
      console.log(data.response.holidays);
      console.log(this.state.currentDateTime)
    }

    clickme=(value)=>{
        // creating a model and and adding content in the model
        document.getElementById("content").style.display="block";
        const month=["January","February","March","April","May","June","July","August","September","October","November","December"];
        document.getElementById("content").innerHTML='<div id="innercontainer" style={style}><p id="date">'+this.state.Data[value].date.datetime.day+' '+
        month[this.state.Data[value].date.datetime.month-1]+' ' + this.state.Data[value].date.datetime.year+'</p>'+
        '<p id="name">'+this.state.Data[value].name+'</p><div id="type">'+this.state.Data[value].type+'</div>'+
        '<p id="description">'+this.state.Data[value].description+'</p>'+
        '<button id="closeBtn">Close</button></div>';
        // Styling the inner container of model 
        var innerStyle=document.getElementById("innercontainer")
        innerStyle.style.backgroundColor="white";
        innerStyle.style.padding="40px 10px";
        innerStyle.style.width="80%";
        innerStyle.style.height="65%";
        innerStyle.style.margin="5% 10%";
        // Styling the content(Date) of model
        var date=document.getElementById("date");
        date.style.fontSize="-webkit-xxx-large";
        date.style.fontWeight="900";
        date.style.margin="30px";
        // Styling the content(Name of Holiday) of model
        var name=document.getElementById("name");
        name.style.fontSize="xx-large";
        name.style.fontWeight="600";
        name.style.margin="5px"
        // Styling the content(type of holiday) of model
        var type=document.getElementById("type");
        type.style.backgroundColor="darkviolet";
        type.style.padding="10px";
        type.style.width="20%";
        type.style.borderRadius="30px";
        type.style.margin="15px 40%";
        // Styling the content(Date) of model
        var description=document.getElementById("description");
        description.style.margin="8% 50px";
        // Styling the content(type of holiday) of model
        var button=document.getElementById("closeBtn");
        button.style.backgroundColor="limegreen";
        button.style.padding="5px";
        button.style.width="10%";
        button.style.color="white";
        // function of close button in the model
        var Cmod=document.getElementById('closeBtn');
        Cmod.onclick=function () {
            document.getElementById("content").style.display="none";
        }    
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
                                <button id="content-btn" key={item.id} onClick={()=>this.clickme(i)}>
                                    {item.date.datetime.day}<br/>
                                    {month[item.date.datetime.month-1]}
                                </button>     
                        )}
                        <div id="content" >
                            
                            
                        </div>
                    </div>
                    
                )}
            </div>
        )
    }
}

export default UpcomingHolidays;