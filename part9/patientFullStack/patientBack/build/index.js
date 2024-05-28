"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Serve static files from the frontend's dist directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../../patientorFront/dist')));
// Example endpoint
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
// Handle all other routes and serve the index.html file
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../patientFront/dist/index.html'));
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
