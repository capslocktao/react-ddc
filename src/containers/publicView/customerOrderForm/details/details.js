import React, {Component} from 'react';

class details extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.match.params.id)
    };

    render() {
        return (
            <div>
                details
            </div>
        )
    }
}

export default details