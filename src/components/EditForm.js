import React, { Component } from 'react'

export default class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            content: this.props.content,
            isPublic: this.props.isPublic,
        };
    }
    deletenote = async (e) => {
        console.log('handling submit')
        setTimeout(async () => {
            const { token, noteid } = this.props;
            console.log(token);
            await fetch('http://localhost:8000/notes/delete', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ noteid })
            })
            this.setState({ title: '', content: '', isPublic: false })
        }, 1000);
        this.props.closeModal();
    }
    handleSubmit = async (e) => {
        console.log('handling submit')
        e.preventDefault();
        const { title, content, isPublic } = this.state;
        if (title === this.props.title && content === this.props.content && isPublic === this.props.isPublic) { } else {
            const { token, noteid } = this.props;
            console.log(token);
            await fetch('http://localhost:8000/notes/edit', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ title, content, isPublic, noteid })
            })
            this.setState({ title: '', content: '', isPublic: false })
        }
        this.props.closeModal();
    }
    handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        this.setState({
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    render() {
        return (
            <div className='modal modal-content'>
                <div className='text-right fw-bolder btn' onClick={()=>{this.props.closeModal()}}>{'Cancel'}</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="title-area"
                            id="title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            required
                            style={{ width: '100%' }}
                            placeholder='Title'
                            title='title of your note'
                        />
                    </div>

                    <div className="form-group mt-3">
                        <textarea
                            type="text"
                            className="content-area"
                            id="content"
                            name="content"
                            value={this.state.content}
                            onChange={this.handleChange}
                            required
                            placeholder='Write something here'
                            rows='18'
                            style={{ width: '100%' }}
                            title='your note content'
                        />
                    </div>
                    <div className="form-check form-switch mt-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="isPublic"
                            name="isPublic"
                            checked={this.state.isPublic}
                            onChange={this.handleChange}
                        />
                        <label className="form-check-label" htmlFor="isPublic">
                            Make Public
                        </label>
                    </div>
                    <button className='text-right fw-bolder btn' type='submit'>{this.state.isPublic === true ? 'Publish' : 'Save note'}</button>
                    <div className='text-right fw-bolder btn' onClick={this.deletenote}>{'Delete'}</div>
                </form>
            </div>
        )
    }
}
