import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, TextareaAutosize, Button, Container, Typography, Paper, Grid } from '@mui/material';
import Home from './home';
import Swal from 'sweetalert2';

const Notebook = () => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [showAllNotes, setShowAllNotes] = useState(false);


  useEffect(() => {
    // Fetch notes from the backend when showAllNotes becomes true
    if (showAllNotes) {
      axios.get('http://localhost:4500/my-notes/view')
        .then((response) => {
          setNotes(response.data);
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
        });
    }
  }, [showAllNotes]);



  const handleAddNote = async () => {

    // Implement your logic to add the note
    const newNote = { title, note };
    setNotes([...notes, newNote]);
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('http://localhost:4500/my-notes/add', {
        title,
        note,
      },

      );

      // Check if the note was successfully added
      if (response.data) {
        // Sweet alert for successful note addition
        Swal.fire({
          icon: 'success',
          title: 'Note Added Successfully!',
          text: 'Your note has been added successfully.',
        });

        console.log('Note added successfully!', response.data);
      } else {
        // Sweet alert for failed note addition
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add Note',
          text: 'Sorry, there was an issue adding your note. Please try again.',
        });

        console.error('Failed to add note.');
      }
    
    } catch (error) {
      console.error('Error while adding note:', error);
      // Handle other errors, e.g., show an error message
    }

    // Clear the form after adding the note
    setTitle('');
    setNote('');
  };

  const handleGetAllNotes = async () => {
    try {
      const response = await axios.get('http://localhost:4500/my-notes/view');
      if (response.data) {
        setNotes(response.data);
        console.log('All notes fetched successfully!', response.data)
        // Extract the noteId from the response
        const noteId = response.data._id;
        handleDeleteNote(noteId)

        // Call the delete function passing the index and noteId
        // handleDeleteNote(index, newNoteId);
      } else {
        console.error('Failed to fetch all notes.');
      }
    } catch (error) {
      console.error('Error while fetching all notes:', error);
    }
  };

  const handleUpdateNote = (index) => {
    
    
    console.log('Updating note at index', index);
  };
  useEffect(() => {
    // Fetch user's notes on component mount or whenever needed
    // Example: fetch notes when the user logs in
    handleGetAllNotes();
  }, []); 


  const handleDeleteNote = async (index, noteId) => {
    try {
      // Make a DELETE request to your backend API endpoint
      const response = await axios.delete(`http://localhost:4500/my-notes/delete/${noteId}`);

      // Check if the note was successfully deleted
      if (response.data) {
        console.log('Note deleted successfully!', response.data);

        // Update the notes array after deletion
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
      } else {
        console.error('Failed to delete note.');
        
      }
    } catch (error) {
      console.error('Error while deleting note:', error);
      
    }
  };


  return (
    <>
      <Home></Home>

      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Create a New Note

        </Typography>

        <TextField
          label="title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextareaAutosize
          minRows={5}
          placeholder="Type your note here..."
          style={{ width: '100%', marginBottom: '16px' }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <Button variant="contained" color="primary" onClick={handleAddNote}>
          Add Note
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowAllNotes(!showAllNotes)}
          
        >
          {showAllNotes ? 'Hide All Notes' : 'Show All Notes'}
        </Button>

        {showAllNotes && (
          <>
            <Typography variant="h5" gutterBottom >
              All Notes
            </Typography>
            <Grid container spacing={2}>
              {notes.map((note, index) => (
                <Grid container spacing={2}>
                  {notes.map((note, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <Paper style={{ padding: '10px', marginBottom: '10px' }}>
                        <Typography variant="h6">{note.title}</Typography>
                        <Typography>{note.note}</Typography>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleDeleteNote(index, note._id)}
                        >
                          Delete
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
            </>
        )}
          </Container>
      </>
      );
};

      export default Notebook;