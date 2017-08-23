import React from 'react';

class ID extends React.Component {

	render() {
		const rush = this.props.rush;
		const comments = this.props.rush.comments;
		const clementine = this.props.rush.votes;
		return (
					<div className="order-wrap">
						<h1>{rush.name} {rush.lastName}</h1>
						<h6>{"Rating: " + rush.rating}</h6>
						<div className="fish-edit">
							<input type="text" name="name" value={rush.name} placeholder="First Name" 
							onChange={(e) => this.handleChange(e)}/>
							<input type="text" name="lastname" value={rush.lastName} placeholder="Last Name"
							onChange={(e) => this.handleChange(e)}/>
							<input type="text" name="hometown" value={rush.hometown} placeholder="Hometown"
							onChange={(e) => this.handleChange(e)}/>
							<input type="text" name="graddate" value={rush.gradDate} placeholder="Graduation Date"
							onChange={(e) => this.handleChange(e)}/>
							<input type="text" name="major" value={rush.major} placeholder="Major"
							onChange={(e) => this.handleChange(e)}/>
							<input type="text" name="room" value={rush.room} placeholder="Room"
							onChange={(e) => this.handleChange(e)}/>
							<input type="text" name="email" value={rush.email} placeholder="Personal Email"
							onChange={(e) => this.handleChange(e)}/>
						</div>
						<div className="fish-edit">
							<input type="text" name="events" value={"Events attended: " + rush.event} placeholder="Events Attended"
							onChange={(e) => this.handleChange(e)}/>
						</div>
						<div className="fish-edit">
							{
								Object.keys(clementine).map((key, index) => (
								<button key={index}>
								 {key + ": "} {clementine[key]}</button>))
							}
						</div>
						<div className="fish-edit">
							{
								Object.keys(comments).map((key, index) => (
								<button key={index}>
								 {key + ": "} {comments[key]}</button>))
							}
						</div>
					</div>			
		)
	}
}

export default ID;
