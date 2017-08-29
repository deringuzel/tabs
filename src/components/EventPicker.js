import React from 'react';
import Tbase from './Tbase';

//TODO: ask yoni about mounting and not mounting problem

class EventPicker extends React.Component {
	constructor() {
		super();
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.renderWelcome = this.renderWelcome.bind(this);
		this.logout = this.logout.bind(this);
		this.state = {
			uid: null,
			username: null, 
		}
	}

	componentDidMount() {
		Tbase.onAuth((user) => {
			if(user) {
				this.authHandler(null, {user})
			}
		});
	}

	goToEvent(event) {
		event.preventDefault();
		const eventId = this.eventInput.value;
		this.context.router.transitionTo(`/event/${eventId}`);
	}

	authenticate() {
		Tbase.authWithOAuthPopup("facebook", this.authHandler); 
	}

	authHandler(err, authData) {
		if (err) {
			console.log(err);
			return;
		} 
		var username = authData.user.displayName.toLowerCase();
		username = username.replace(/\s/g, '');
		this.setState({
			uid: authData.user.uid,
			username: username
		});
		this.renderWelcome();
	}
		
	renderLogin() {
		return (
			<nav className="login">
				<button className="facebook" onClick={() => this.authenticate()}>
				T Login</button>
			</nav>
		)
	}

	logout() {
		Tbase.unauth();
		this.setState({
			uid: null,
			username: null
		});
	}

	renderWelcome() {
		return(
			<nav className="login">
				<div>
					<button className="facebook" onClick={() => 
						this.context.router.transitionTo(`/tmember/${this.state.username}/search`)}>
					Welcome  {this.state.username}</button>
					<button onClick={() => this.logout()}>Log out</button>
				</div>
			</nav>
			)
	}

	render() {
		if(this.state.username) {
			return (
				<div>
					<form className="event-selector" onSubmit={this.goToEvent.bind(this)}>
					<h2>Event</h2>
					<input type="text" required placeholder="Event Name"
						 ref={(input) => {this.eventInput= input}}/>
					<button type="submit">Create Event</button>
					</form>
					<div>{this.renderWelcome()}</div>
				</div>
			)
		} else {
			return (
				<div>
					<form className="event-selector" onSubmit={this.goToEvent.bind(this)}>
					<h2>Event</h2>
					<input type="text" required placeholder="Event Name" ref={(input) => {this.eventInput= input}}/>
					<button type="submit">Create Event</button>
					</form>
					<div>{this.renderLogin()}</div>
				</div>
				)
		}
	}
}

EventPicker.contextTypes = {
	router: React.PropTypes.object
}

export default EventPicker;
