const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Adaptador con credenciales
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Servidor Restify
const server = restify.createServer();
const port = process.env.PORT || 3978;
server.listen(port, () => {
    console.log(`\nBot is listening on port ${port}`);
});

// Ruta de prueba
server.get('/test', (req, res, next) => {
    res.send(200, { status: 'ok', message: 'Bot service is running' });
    next();
});

// Manejo de errores global
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError]: ${error}`);
    await context.sendActivity('Ocurrió un error.');
};

// Ruta principal del bot
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
