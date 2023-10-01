import React, { Component } from 'react'
import NoteContainer from './NoteContainer';

export default class ShareNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:8000/notes/private', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${this.props.token}`,
        },
      });
      const notes = await response.json();
      this.setState({ notes });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }
  makePublic = async (noteid, title, content) => {
    const { token } = this.props;
    console.log(token);
    await fetch('http://localhost:8000/notes/edit', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ title, content, isPublic: true, noteid })
    })
    this.props.redirecttopublic('browse');
  }
  render() {
    const { notes } = this.state;

    return (
      <div>
        <h2>Click on a note to make it public</h2>
        <div className="note-container">
          {notes.map((note) => (
            <div key={note._id} className="single-note" onClick={()=>{this.makePublic(note._id, note.title, note.content)}}>
              <NoteContainer title={note.title} content={note.content} />
            </div>
          ))}
          {notes.length === 0 ? <>First time? Click on create a note to store see your notes here</> : <></>}
        </div>
      </div>
    );
  }
}
