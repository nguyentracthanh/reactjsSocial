import axios from "axios";
import React, { Component } from 'react';


export default class ReactfbPagedata extends Component {
  state = {
    fbData: [],
    postData:[]
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
  getPagePostData = () => {
    axios
      .get("https://graph.facebook.com/395716977428401/feed?fields=is_eligible_for_promotion,promotable_id,message,created_time,shares,reactions&access_token=EAAEPte3grfEBAEg4QPqTJs1UL2NNfEUuB5PrNoRB8ZBOBHwCMEbNZAIXdA5mQxeSB4ZCewt6oSApK7fRiNIYIwcwV4TYdEr2LxNlouTq5SNSRMs0UA8eZB5MmLvv1KyZAVtO5vv2J0Audm6iRqQ5Yid7n4Vm6DAzQIeZB9vnVnHtWiKufMA9LIKEAZCN9ZBX3gel3Dugt26lJGiM7O9GpasH"
      )
      .then(
        res => {
          const result = res.data;
          console.log(result);
          alert("Success!");
          this.setState({
            postData:result.data
          });
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
        <button onClick={this.getPagePostData}>GET</button>
        <br/>
        <br/>
        This is Page: {this.state.fbData.map(dataItem=><div key={dataItem.id}>{dataItem.name} 
        <br/>
        access token : {dataItem.access_token}</div>)}
        <br/>
        Time create: {this.state.postData.map(postDataItem => <div>{postDataItem.created_time}
        <br />
        ID post: {postDataItem.id}
        
        <br />
        Message: {postDataItem.message}</div>)}
        
      </div>
    );
  }
  
 
}


