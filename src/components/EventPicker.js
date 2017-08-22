import React from 'react';
import Tbase from './Tbase';

class EventPicker extends React.Component {
	constructor() {
		super();
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.state = {
			uid: null,
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
		//this.context.router.transitionTo(`/tmember/derin`);
	}

	authHandler(err, authData) {
		if (err) {
			console.log(err);
			return;
		} 
		this.setState({
			uid: authData.user.uid
		});
	}
		
	renderLogin() {
		//this.authenticate
		return (
			<nav className="login">
				<button className="facebook" onClick={() => 
					this.context.router.transitionTo(`/tmember/derin/search`)}>
				T Login</button>
			</nav>
		)
	}

	render() {
		//if(!this.state.uid) {
		//	return <div>{this.renderLogin()}</div>
		//}
		return (
			<div>
				<form className="event-selector" onSubmit={this.goToEvent.bind(this)}>
				<h2>Event</h2>
				<input type="text" required placeholder="Event Name"
					 ref={(input) => {this.eventInput= input}}/>
				<button type="submit">Create Event</button>
				</form>
				<div>{this.renderLogin()}</div>
			</div>

			)
		
	}
}

EventPicker.contextTypes = {
	router: React.PropTypes.object
}

export default EventPicker;