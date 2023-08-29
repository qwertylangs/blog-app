const { rmSync } = require('fs');
const path = require('path');

rmSync(path.join(__dirname, '..', 'node_modules', '.cache'), { recursive: true, force: true });
