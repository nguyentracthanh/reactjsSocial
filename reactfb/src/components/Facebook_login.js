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

    componentClicked = () => {
        console.log('Facebook btn clicked');
    }

    render() {
        let facebookData;

        this.state.auth ?
            facebookData = (
                <div style={{
                    width: '400px',
                    margin: 'auto',
                    background: '#f4f4f4',
                    padding: '20px',
                    color: '#000'
                }}>
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Welcome {this.state.name}!</h2>
                    <p width="100">AccessToken is {this.state.user_accesstoken}</p>
                    <h2>user ID: {this.state.user_id}</h2>
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