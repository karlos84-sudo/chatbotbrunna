const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Configuración del adaptador
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Crear servidor
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`\nBot is listening on ${server.url}`);
});

// Manejo de errores
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError]: ${error}`);
    await context.sendActivity('Ocurrió un error.');
};

// Ruta para el bot
server.post('/api/messages', (req, res, next) => {
    adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === 'message') {
            const text = context.activity.text.trim().toLowerCase();
            if (text === 'hola') {
                await context.sendActivity('¡Hola! Bienvenido a la tienda 👗. ¿Qué producto quieres consultar?');
            } else {
                await context.sendActivity(`Estoy buscando disponibilidad de: "${text}"... (modo demo)`);
                await context.sendActivity('✅ Sí tenemos disponible ese producto en todas las tallas.');
            }
        }
    });
    next();
});

// Ruta de prueba para variables de entorno
server.get('/test-config', (req, res, next) => {
    const appId = process.env.MicrosoftAppId;
    const appPassword = process.env.MicrosoftAppPassword;

    res.send({
        MicrosoftAppId: appId ? 'OK (valor presente)' : 'NO DEFINIDO',
        MicrosoftAppPassword: appPassword ? 'OK (valor presente)' : 'NO DEFINIDO'
    });
    next();
});
