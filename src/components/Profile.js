import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CreateNote from './CreateNote';
import AllNotes from './AllNotes';
import ShareNotes from './ShareNotes';
import UpdateAccount from './UpdateAccount';
import Browse from './Browse';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            isLoading: true,
            currenttab: 'view',
        };
    }
    changeCurrentTab = (tabname) => {
        this.setState({ currenttab: tabname });
    }
    async componentDidMount() {
        try {
            const { token } = this.props;
            console.log(token)
            const response = await fetch('http://localhost:8000/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            console.log('this is response' + response)
            const userData = await response.json();
            console.log('this is userdata' + userData)
            if (!userData.username) {
                throw new Error('Failed to fetch user data');
            }
            this.setState({
                userData,
                isLoading: false,
            });
        } catch (error) {
            console.error(error);
            this.setState({
                isLoading: false,
            });
        }
    }
    render() {
        const { userData, isLoading } = this.state;
        if (userData) {
            return (
                <div className='profile-content'>
                    <div className="navbar-container ">
                        <nav
                            className="bg-primary text-white d-flex flex-column align-items-start fixed"
                            style={{ width: '20vw', height: '100vh', minWidth: '75px', maxWidth: '250px' }}
                        >
                            <div className="p-4">
                                <h4>Hey there, {this.state.userData.username}</h4>
                            </div>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to="" className="nav-link text-white" onClick={() => { this.changeCurrentTab('create') }}>
                                        Create a Note
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="" className="nav-link text-white" onClick={() => { this.changeCurrentTab('view') }}>
                                        My Notes
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="" className="nav-link text-white" onClick={() => { this.changeCurrentTab('share') }}>
                                        Share Your Notes
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="" className="nav-link text-white" onClick={() => { this.changeCurrentTab('browse') }}>
                                        Browse Public notes
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="" className="nav-link text-white" onClick={() => { this.changeCurrentTab('update') }}>
                                        Update Account Details
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='tab'>
                        {this.state.currenttab === 'create' ? <CreateNote token={this.props.token}/> : <></>}
                        {this.state.currenttab === 'view' ? <AllNotes token={this.props.token}/> : <></>}
                        {this.state.currenttab === 'share' ? <ShareNotes token={this.props.token} redirecttopublic={this.changeCurrentTab}/> : <></>}
                        {this.state.currenttab === 'browse' ? <Browse token={this.props.token}/> : <></>}
                        {this.state.currenttab === 'update' ? <UpdateAccount token={this.props.token}/> : <></>}
                    </div>
                </div>
            )
        } else if (isLoading) {
            return <div onClick={this.componentDidMount}>Loading...</div>;

        } else {
            return (
                <div className="text-center mt-5">
                    <p className="lead">
                        Please{' '}
                        <Link to="/login" className="btn btn-primary">
                            Login
                        </Link>{' '}
                        or{' '}
                        <Link to="/register" className="btn btn-secondary">
                            Register
                        </Link>{' '}
                        to see your profile.
                    </p>
                </div>
            )
        }
    }
}
export default Profile;