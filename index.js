const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Aplicación Node.js funcionando en Azure App Service');
});

// Ruta de prueba para variables de entorno
app.get('/test-config', (req, res) => {
    const appId = process.env.MicrosoftAppId;
    const appPassword = process.env.MicrosoftAppPassword;

    res.json({
        MicrosoftAppId: appId ? 'OK (valor presente)' : 'NO DEFINIDO',
        MicrosoftAppPassword: appPassword ? 'OK (valor presente)' : 'NO DEFINIDO'
    });
});

// Puerto asignado por Azure o 3000 en local
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});
