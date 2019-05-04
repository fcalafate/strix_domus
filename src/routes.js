const express = require("express");
const routes = express.Router();
const deviceController = require("./controller/deviceController")

routes.get('/', (req, res) => res.send('OK') );

routes.get('/devices', (req, res) => {
    const devController = new deviceController();
    
    devController.ListAll()
     .then(devicesList => res.json(devicesList))
     .catch(err => res.json({response: 'ERRO', message: err}));
});

routes.get('/device/:mac', (req, res) => {
    const devController = new deviceController();
    
    devController.ListByMac(req.params.mac)
     .then(devicesList => res.json(devicesList))
     .catch(err => res.json({response: 'ERRO', message: err}));
});

routes.post('/device/:mac/:state/:source', (req, res) => {
    const devController = new deviceController();
    
    devController.RegisterDeviceByMac(req.params.mac, req.params.state, req.params.source)
     .then(devicesList => res.json(devicesList))
     .catch(err => res.json({response: 'ERRO', message: err}));
});

routes.get('/devicestate/:mac', (req, res) => {
    const devController = new deviceController();
    
    devController.GetStateByMac(req.params.mac)
     .then(devicesList => res.json(devicesList))
     .catch(err => res.json({response: 'ERRO', message: err}));
});

routes.put('/devicestate/:mac/:state/:source', (req, res) => {
    const devController = new deviceController();
    
    devController.SetStateByMac(req.params.mac, req.params.state, req.params.source)
     .then(devicesList => res.json(devicesList))
     .catch(err => res.json({response: 'ERRO', message: err}));
});

module.exports = routes;