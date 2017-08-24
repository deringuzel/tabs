import React from 'react';

class Information extends React.Component {
	render() {
		const rush = this.props.rush;
		return (

				<div>
						<h1>{rush.name} {rush.lastName}</h1>
						<h6>{"Rating: " + rush.rating}</h6>
						<div className="commentHeader">Info</div>
						<table>
							<tbody>
								<tr>
								    <th scope="col">{rush.name}</th>
								    <th scope="col">{rush.lastName}</th>
								    <th scope="col">{rush.hometown}</th>
			  					</tr>
			  					<tr>
			  						<th scope="col">{rush.gradDate}</th>
								    <th scope="col">{rush.major}</th>
								    <th scope="col">{rush.email}</th>
			  					</tr>
			  				</tbody>
						</table>
						
						<div className="boxed">
								<div className="commentHeader">Events</div>
								<div className="warningMessage">{rush.event}</div>
						</div>
				</div>
				
	)
	}
}
export default Information;
