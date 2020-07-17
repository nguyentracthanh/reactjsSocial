import React, { Component } from 'react';
import FacebookLoginBtn from 'react-facebook-login';	

export default class LoginFacebook extends Component {
    state = {
        auth: false,
        name: '',
        picture: '',
        user_accesstoken:'',
        user_id:''
    };

    responseFacebook = response => {
        console.log(response);
        if (response.status !== 'unknown')
            this.setState({
                auth: true,
                name: response.name,
                picture: response.picture.data.url,
                user_accesstoken:response.accessToken,
                user_id:response.userID
            });

    }
    checkAccessToken=response => {
        if (this.state.user_accesstoken === response.accessToken){
            response.history.replaceState('./home')
        }
    }
    componentClicked = () => {
        console.log('Facebook btn clicked');
    }

    render() {
        let facebookData;

        this.state.auth ?
            facebookData = (
                <div style={{
                    width: '200px',
                    margin: 'auto',
                    background: '#f4f4f4',
                    padding: '20px',
                    color: '#000'
                }}>
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Welcome {this.state.name}!</h2>
                   
                </div>
            ) :
            facebookData = (<FacebookLoginBtn
                appId="298749031132657"
                autoLoad={true}
                fields="name,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);

        return (
            <>
                {facebookData}
                 
            </>
        );
    }
}