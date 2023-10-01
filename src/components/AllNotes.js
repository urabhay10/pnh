import React, { Component } from 'react';
import NoteContainer from './NoteContainer';
import EditForm from './EditForm';

class ViewAllNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      isModalOpen: false,
      modaltitle: '',
      modalcontent: '',
      modalnoteid: '',
      modalisPublic: ''
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:8000/notes/all', {
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
  openModal = (title, content, isPublic, noteid) => {
    this.setState({ isModalOpen: true,modaltitle: title, modalcontent: content, modalisPublic: isPublic, modalnoteid: noteid });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { notes } = this.state;

    return (
      <div>
        <h2>Your Notes</h2>
        <div className="note-container">
          {notes.map((note) => (
            <div key={note._id} className="single-note" onClick={() => { this.openModal(note.title, note.content, note.isPublic, note._id) }}>
              {/* {console.log(note)} */}
              <NoteContainer title={note.title} content={note.content} />
            </div>
          ))}
          {notes.length === 0 ? <>First time? Click on create a note to store see your notes here</> : <></>}
        </div>
        {this.state.isModalOpen && (
          <div className="">
            {/* <Modal onClose={this.closeModal}> */}
              <EditForm closeModal={this.closeModal} token={this.props.token} title={this.state.modaltitle} content={this.state.modalcontent} noteid={this.state.modalnoteid} isPublic={this.state.modalisPublic} />
            {/* </Modal> */}
          </div>
        )}
      </div>
    );
  }
}

export default ViewAllNotes;
