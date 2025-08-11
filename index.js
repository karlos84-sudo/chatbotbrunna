const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Configuración del adaptador con las credenciales de Azure
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Servidor Restify
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`\nBot is listening to ${server.url}`);
});

// Manejo de mensajes
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError]: ${error}`);
    await context.sendActivity('Ocurrió un error.');
};

// Ruta principal del bot
server.post('/api/messages', (req, res) => {
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
});

