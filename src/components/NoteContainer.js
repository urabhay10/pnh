import React, { Component } from 'react'

export default class NoteContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',
        };
    };
    // async componentDidMount() {
    //     try {
    //         const { title,content } = this.props;
    //         this.setState({title: title,content: content})
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    render() {
        const {author }= this.props;
        return (
            <div className='w-100 h-50 rounded border-secondary bg-primary p-2 mx-2 my-2' style={{maxHeight: author?'150px':'100px'}}>
                <h3>{this.props.title}</h3>
                {author?<p>By: {author.username}</p>:null}
                <p>{this.props.content.length>320?this.props.content.slice(0,320)+"...":this.props.content}</p>
            </div>
        )
    }
}
