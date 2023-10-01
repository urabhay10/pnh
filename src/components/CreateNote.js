import React, { Component } from 'react'

export default class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            isPublic: false,
        };
    }
    handleSubmit = async (e) => {
        console.log('handling submit')
        e.preventDefault();
        setTimeout(async () => {
            const { title, content,isPublic } = this.state;
            const { token } = this.props;
            console.log(token);
            let savedNote = await fetch('http://localhost:8000/notes/create', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ title, content,isPublic })
            })
            let data = await savedNote.json();
            console.log(data);
            if (!data.title) {
                alert('unknown error occured')
            }
            this.setState({ title: '', content: '', isPublic: false })
        }, 1000);

    }
    handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        this.setState({
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    render() {
        return (
            <>
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
                            style={{ width: '70%' }}
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
                            style={{ width: '70%' }}
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
                    <button className='text-right fw-bolder btn' type='submit'>{this.state.isPublic===true?'Publish':'Save note'}</button>
                </form>
            </>
        )
    }
}
