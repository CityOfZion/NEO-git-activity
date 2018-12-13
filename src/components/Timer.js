import React, {Component} from 'react'

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state={time: 'Current time'}
    }
    componentDidMount() {
        this.timer = setInterval(this.tick, 5000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    tick(){
        // this.setState({time: new Date()})
        if (this.props.myfunction)
            this.props.myfunction();
    }
    render() {
        return (
            <div className="timer">{this.state.time}</div>
        )
    }
}

export default Timer