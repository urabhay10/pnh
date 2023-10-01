import React, { Component } from 'react'
import NoteContainer from './NoteContainer';

export default class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            notes: []
        };
    }
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:8000/notes/public/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const notes = await response.json();
            this.setState({ notes });
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }
    render() {
        const { notes } = this.state;

        return (
          <div>
            <h2>All public notes</h2>
            <div className="note-container">
              {notes.map((note) => (
                <div key={note._id} className="single-note">
                  {/* {console.log(note)} */}
                  <NoteContainer title={note.title} author={note.author} content={note.content}/>
                </div>
              ))}
              {notes.length===0?<>Oops, looks like noone has made their notes public.</>:<></>}
            </div>
          </div>
        );
    }
}
