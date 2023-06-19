import * as tuitsDao from './tuits-dao.js'

const createTuit = async (req, res) => {

    const newTuit = req.body;
  // newTuit._id = (new Date()).getTime()+'';
  newTuit.likes = 0;
  newTuit.replies = 0;
  newTuit.retuits = 0;
  newTuit.dislikes = 0;
  newTuit.liked = false;
  newTuit.handle = "@boeing";
  newTuit.time = "2h";
  newTuit.image="spacex.webp"
  
  // tuits.unshift(newTuit);
  const insertedTuit = await tuitsDao.createTuit(newTuit);
  res.json(insertedTuit);

//   console.log(tuits);

}
const findTuits  = async (req, res) => {
    const topic = req.query.topic
    const tuits = await tuitsDao.findTuits()
    if(topic) {
      const tuitsOfType = tuits
        .filter(u => u.topic === topic)
      res.json(tuitsOfType)
      return
    }

    res.json(tuits)
}
const updateTuit = async (req, res) => {
  console.log(req.body)
    const tuitdId = req.params.tid;
    const updates = req.body;
    // const tuitIndex = tuits.findIndex((t) => t._id === tuitdId)
    const status = await tuitsDao
    .updateTuit(tuitdId, updates);
res.json(status);

}
const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.json(status);
}

export default (app) => {
 app.post('/api/tuits', createTuit);
 app.get('/api/tuits', findTuits);
 app.put('/api/tuits/:tid', updateTuit);
 app.delete('/api/tuits/:tid', deleteTuit);
}
