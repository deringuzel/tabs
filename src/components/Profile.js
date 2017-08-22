import React from 'react';
import Tbase from './Tbase';

class Profile extends React.Component{
	constructor() {
		super();
		this.state = {
			rush: {}
		}
	}

	componentWillMount() {
		var ref = Tbase.database().ref('tabard-725e5/rushes/' + this.props.params.rushName);
		JSON.stringify(ref);//const r = $firebaseObject(ref);
		console.log(ref);
		//this.setState({rush: rush});
	}

	componentWillUnmount() {
		Tbase.removeBinding(this.ref);
	}


	render() {
		return (
			<div className="order-wrap">
				<h2>Trash 2017</h2>	
				<form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={(e) => this.createRush(e)}>
					<input ref={(input) => this.name = input} type="text" placeholder=" First Name"/>
					<input ref={(input) => this.lastName = input} type="text" placeholder="Last Name"/>
					<input ref={(input) => this.hometown = input} type="text" placeholder="Hometown"/>
					<input ref={(input) => this.gradDate = input} type="text" placeholder="Graduation Date"/>
					<input ref={(input) => this.major = input} type="text" placeholder="Major"/>
					<input ref={(input) => this.room = input} type="text" placeholder="Room"/>
					<input ref={(input) => this.email = input} type="text" placeholder="Personal Email"/>
					<button type="submit">Submit</button>
				</form>
			</div>	
			)
	}
}

export default Profile;
