import React from 'react';

class Register extends React.Component{

	createRush(event) {
		event.preventDefault();

		const rush = {
			name: this.name.value,
			lastName: this.lastName.value,
			hometown: this.hometown.value,
			gradDate: this.gradDate.value,
			major: this.major.value,
			room: this.room.value,
			email: this.email.value,
			cut: 'Not cut',
			event: [],
			comments: {"NA": "No comments yet"},
			rating: {
				love: 0,
				hate: 0,
				NA: 0
			}, 
			votes: {"NA": "No clementine yet"},
			pictures: []
		}

		rush.event.push(this.props.event);
		
		const name = rush.name + rush.lastName;

		this.props.addRush(rush, name.toLowerCase());
		this.rushForm.reset();
	}

	render() {
		return (
			<div className="order-wrap">
				<h2>Register Here</h2>	
				<form ref={(input) => this.rushForm = input} className="fish-edit" onSubmit={(e) => this.createRush(e)}>
					<input ref={(input) => this.name = input} type="text" placeholder=" First Name"/>
					<input ref={(input) => this.lastName = input} type="text" placeholder="Last Name"/>
					<input ref={(input) => this.hometown = input} type="text" placeholder="Hometown"/>
					<input ref={(input) => this.gradDate = input} type="text" placeholder="Graduation Date"/>
					<input ref={(input) => this.major = input} type="text" placeholder="Major"/>
					<input ref={(input) => this.room = input} type="text" placeholder="Room"/>
					<input ref={(input) => this.email = input} type="text" placeholder="Personal Email"/>
					<button type="submit">Submit</button>
				</form>
				<button className="facebook" onClick={() => this.context.router.transitionTo(`/`)}>Home</button>
			</div>	
		)
	}
}

Register.contextTypes = {
	router: React.PropTypes.object
}

export default Register;
