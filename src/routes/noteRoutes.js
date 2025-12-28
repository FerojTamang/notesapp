import express from 'express'
import Note from '../models/Note.js'
const router = express.Router()

// get all notes  _req vaaneko function ho yo hamle use gardaina vaneko
//log in ma chia hamle post use garxam security le grda get the query garni vayera 
router.get('/', async (req, res)=>{    
    try {
         const notes = await Note.find()  //Note.find vaneko mongodb ko code , sql ma * diyera taneko jasto 
         res.json(notes)
    }
    catch(error){
        res.status(400).json({ messaage: error.messaage })
    }
}
)

//get by id
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);  //id ko lagi chai hamle params use garxam query haina , tei id matrai reada garxaa paramas le 

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// create note
router.post('/', async (req, res) => {
{
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        color: req.body.color,
    })

    try {
        const newNote = await note.save()
        res.status(201).json({
            success: true,
            data: newNote
        })
    }
    catch (error) {
        res.status(400).json({ messaage: error.messaage })
    }
}
})

//update note  //put le chai naya nai updategardinxa paatch le pailako lai replace garxa vanxa , thulo project ma file may be patch use hunxa
router.put('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (req.body.title) note.title = req.body.title
        if (req.body.content) note.content = req.body.content
        if (req.body.color) note.color = req.body.color

        const updatedNote = await note.save()
        res.json(updatedNote)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete

router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }
//delete vayepaxi chi hamle res ma kaile ni data pathaudaina
    await note.deleteOne()
    res.json({ message: 'Note deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


export default router
   
