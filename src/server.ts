import express from 'express';
// Get environment variables in required data type
import * as env from './configs/env';
import { router } from './routes/main';

// Set configs for logging
import {} from './configs/logger';

// Init Express Application
const app = express();

// Attach router
app.use(router);

// Start listening
app.listen(env.PORT, () => {
    console.info(`Now listening on ${env.PORT}`);
});

// This will push out error into log if any of error was not catched correctly
process.on('uncaughtException', (err) => {
    console.error(err);
});
