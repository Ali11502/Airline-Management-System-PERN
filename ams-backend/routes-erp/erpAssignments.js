const router = require('express').Router();
const pool = require('../db');
const asyncHandler = require('express-async-handler');

router.post('/pilotAssignments', async (req, res) => {
  try {
    const { employeeid, flightid, assignmentStatus } = req.body;

    const newAssignment = await pool.query(
      'INSERT INTO PilotAssignments (employeeid, flightid, AssignmentStatus) VALUES ($1, $2, $3) RETURNING *',
      [employeeid, flightid, assignmentStatus]
    );

    res.json(newAssignment.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/crewAssignments', async (req, res) => {
  try {
    const { employeeid, flightid, assignmentStatus } = req.body;

    const newAssignment = await pool.query(
      'INSERT INTO CrewAssignments (employeeid, flightid, AssignmentStatus) VALUES ($1, $2, $3) RETURNING *',
      [employeeid, flightid, assignmentStatus]
    );

    res.json(newAssignment.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/engineerAssignments', async (req, res) => {
  try {
    const { employeeid, aircraftid, assignmentDate, completionDate, assignmentStatus } = req.body;

    const newAssignment = await pool.query(
      'INSERT INTO EngineerAssignments (employeeid, aircraftid, AssignmentDate, CompletionDate, AssignmentStatus) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [employeeid, aircraftid, assignmentDate, completionDate, assignmentStatus]
    );

    res.json(newAssignment.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// GET request for PilotAssignments
router.get('/pilotAssignments/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const assignments = await pool.query('SELECT * FROM PilotAssignments where employeeid = $1', [id]);
  res.json(assignments.rows);
}));

// // DELETE request for deleting a specific PilotAssignment by ID
// router.delete('/pilotAssignments/:id', asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   await pool.query('DELETE FROM PilotAssignments WHERE employeeid = $1', [id]);
//   res.json({ message: 'PilotAssignment deleted successfully' });
// }));

// GET request for retrieving a specific CrewAssignment by ID
router.get('/crewAssignments/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const assignment = await pool.query('SELECT * FROM CrewAssignments WHERE employeeid = $1', [id]);
  res.json(assignment.rows);
}));

// // DELETE request for deleting a specific CrewAssignment by ID
// router.delete('/crewAssignments/:id', asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   await pool.query('DELETE FROM CrewAssignments WHERE employeeid = $1', [id]);
//   res.json({ message: 'CrewAssignment deleted successfully' });
// }));

// GET request for retrieving a specific EngineerAssignment by ID
router.get('/engineerAssignments/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const assignment = await pool.query('SELECT * FROM EngineerAssignments WHERE employeeid = $1', [id]);
  res.json(assignment.rows);
}));

// // DELETE request for deleting a specific EngineerAssignment by ID
// router.delete('/engineerAssignments/:id', asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   await pool.query('DELETE FROM EngineerAssignments WHERE employeeid = $1', [id]);
//   res.json({ message: 'EngineerAssignment deleted successfully' });
// }));



// Get Pilot Assignments for a Manager
router.get('/manager/pilotAssignments/:managerid', asyncHandler(async (req, res) => {
  const { managerid } = req.params;
  const assignments = await pool.query(`
  SELECT pa.assignmentid, pa.employeeid, pa.flightid, pa.AssignmentStatus
  FROM PilotAssignments pa
  JOIN EMPLOYEE e ON pa.employeeid = e.employeeid
  WHERE e.managerid = $1
  `, [managerid]);
  res.json(assignments.rows);
}));

// Get Crew Assignments for a Manager
router.get('/manager/crewAssignments/:managerid', asyncHandler(async (req, res) => {
  const { managerid } = req.params;
  const assignments = await pool.query(`
    SELECT ca.assignmentid, ca.employeeid, ca.flightid, ca.AssignmentStatus
    FROM CrewAssignments ca
    JOIN EMPLOYEE e ON ca.employeeid = e.employeeid
    WHERE e.managerid = $1
  `, [managerid]);
  res.json(assignments.rows);
}));

// Get Engineer Assignments for a Manager
router.get('/manager/engineerAssignments/:managerid', asyncHandler(async (req, res) => {
  const { managerid } = req.params;
  const assignments = await pool.query(`
    SELECT ea.assignmentid, ea.employeeid, ea.aircraftid, ea.AssignmentDate, ea.CompletionDate, ea.AssignmentStatus
    FROM EngineerAssignments ea
    JOIN EMPLOYEE e ON ea.employeeid = e.employeeid
    WHERE e.managerid = $1
  `, [managerid]);
  res.json(assignments.rows);
}));


router.put('/completePilotAssignment/:assignmentId', async (req, res) => {
  const assignmentId = req.params.assignmentId;

  try {
    await pool.query(
      'UPDATE PilotAssignments SET AssignmentStatus = $1 WHERE AssignmentID = $2',
      ['completed', assignmentId]
    );
    res.status(200).send('Pilot Assignment marked as completed.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/completeCrewAssignment/:assignmentId', async (req, res) => {
  const assignmentId = req.params.assignmentId;

  try {
    await pool.query(
      'UPDATE CrewAssignments SET AssignmentStatus = $1 WHERE AssignmentID = $2',
      ['completed', assignmentId]
    );
    res.status(200).send('Crew Assignment marked as completed.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/completeEngineerAssignment/:assignmentId', async (req, res) => {
  const assignmentId = req.params.assignmentId;

  try {
    await pool.query(
      'UPDATE EngineerAssignments SET AssignmentStatus = $1 WHERE AssignmentID = $2',
      ['completed', assignmentId]
    );
    res.status(200).send('Engineer Assignment marked as completed.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.delete('/deletePilotAssignment/:assignmentId', async (req, res) => {
  const assignmentId = req.params.assignmentId;

  try {
    await pool.query('DELETE FROM PilotAssignments WHERE AssignmentID = $1', [assignmentId]);
    res.status(200).send('Pilot Assignment deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.delete('/deleteCrewAssignment/:assignmentId', async (req, res) => {
  const assignmentId = req.params.assignmentId;

  try {
    await pool.query('DELETE FROM CrewAssignments WHERE AssignmentID = $1', [assignmentId]);
    res.status(200).send('Crew Assignment deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.delete('/deleteEngineerAssignment/:assignmentId', async (req, res) => {
  const assignmentId = req.params.assignmentId;

  try {
    await pool.query('DELETE FROM EngineerAssignments WHERE AssignmentID = $1', [assignmentId]);
    res.status(200).send('Engineer Assignment deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
