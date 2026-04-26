import pino from "pino";
const logger: pino.Logger = pino({
    level: process.env.LOG_LEVEL || "info",
    redact: {
        paths: ['req.headers.authorization', 'req.body.password'],
        censor: '***'
    },
    formatters: {
        level: (label) => {
            return {
                level: label.toUpperCase()
            }; // Changes level 30 to "INFO"
        },
    }
});
export { logger };