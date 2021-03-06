import React from 'react';

class Information extends React.Component {
	render() {
		const rush = this.props.rush;
		var eventString = '';
		for (var i = 0; i < rush.event.length - 1; i++) {
			eventString += rush.event[i] + ", ";
		}
		eventString += rush.event[rush.event.length - 1];

		return (

				<div>
						<h1>{rush.name} {rush.lastName}</h1>
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
								<div className="warningMessage">{eventString}</div>
						</div>
						<div className="boxed">
								<div className="commentHeader">General Opinion</div>
								<div className="warningMessage">{"Love: " + rush.rating["love"]}</div>
								<div className="warningMessage">{"Hate: " + rush.rating["hate"]}</div>
								<div className="warningMessage">{"Don't know: " + rush.rating["NA"]}</div>
						</div>
				</div>
				
	)
	}
}
export default Information;
