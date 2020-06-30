const express = require('express');
const members = require('../../Members');

const uuid = require('uuid');

const router = express.Router();


//Get all members
router.get('/', (req, res) => {
  res.json(members)
});


//Get single member
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if(found) {
      res.json(members.filter(member => member.id === parseInt(req.params.id)))
  }
  else{
    res.status(400).json({msg : `Member not found with id of ${req.params.id}`});
  }
});



//Create Member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if(!newMember.name || !newMember.email) {
    return res.status(400).json({msg: 'Please include name and email'});
  }
  members.push(newMember);
  res.json(members);
});


//Update Members
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if(found) {
      const updMember = req.body;
      members.forEach(member => {
        if(member.id === parseInt(req.params.id)) {
          member.name = updMember.name ? updMember.name : member.name;
          member.email = updMember.email ? updMember.email : member.email;
          res.json({msg : 'Member got updated', member});
        }
      });

  }
  else{
    res.status(400).json({msg : `Member not found with id of ${req.params.id}`});
  }
})

//Delete member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === req.params.id);
  if(found) {
      res.json({
        msg: "Member deleted",
        members: members.filter(member => member.id !== req.params.id)
      });
  }
  else{
    res.status(400).json({msg : `Member not found with id of ${req.params.id}`});
  }
});


module.exports = router;
