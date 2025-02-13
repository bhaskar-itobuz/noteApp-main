import express from 'express';
import { seedNotesDatabase } from '../seeds/noteseedData.js';
import { createData ,updateData,deleteData,findAll,findbyId, sortbyQuery} from '../controllers/noteController.js';
import { validateData } from '../middleware/validateData.js';
import { noteValidationSchema } from '../validator/noteValidation.js';

const routeNote = express.Router();

routeNote.post('/create',validateData(noteValidationSchema),createData);
routeNote.put('/update/:noteId',validateData(noteValidationSchema),updateData);
routeNote.delete('/delete/:noteId',deleteData);
routeNote.get('/alldata',findAll);
routeNote.get('/find/:noteId',findbyId);
routeNote.get('/sort',sortbyQuery);
routeNote.post('/seedNote',seedNotesDatabase);
export default routeNote;