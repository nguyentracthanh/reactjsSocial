import axios from "axios";
import React, { Component } from 'react';


export default class ReactfbPagedata extends Component {
  state = {
    fbData: []
  }
  getPageData = () => {
    axios
      .get("https://graph.facebook.com/2556677127928535/accounts?access_token=EAAEPte3grfEBAMET9CUl8qdT4wBXt1SganspcEbVZBdVYFgkH7IkpbE7AWHsWEokzZCWU46WNEe6Ans1Tfj7nb6SgAtZBO9ItdkZASfMWfTGaFlelezKzgynnK2X0OLDCkNPmMW1LK2dqZBllYK39yJd0i9sALrpCTHwCxBO8PyBu8ZBd673KI"
      )
      .then(
        res => {
          const result = res.data;
          console.log(result);
          alert("Success!");
          this.setState({
            fbData: result.data
          })
        },
        error => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div>
        React Facebook Get page Data
        <br />
        <button onClick={this.getPageData}>GET</button>
        <br/>
        <br/>
        This is Page: {this.state.fbData.map(dataItem=><div key={dataItem.id}>{dataItem.name} 
        <br/>
        access token : {dataItem.access_token}</div>)}
        
      </div>
    );
  }
  
 
}


