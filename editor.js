import { spawn } from 'child_process';

export async function launchEditor(filePath) {
    return new Promise((resolve, reject) => {
        // Spawn a child process to run the nano editor
        const nano = spawn('mcedit', [filePath], {
            stdio: 'inherit'  // Use the parent's stdio directly
        });

        // Handle the close event
        nano.on('close', (code) => {
            if (code === 0) {
                console.log('Nano exited successfully.');
                resolve();
            } else {
                console.log(`Nano exited with code ${code}`);
                reject(new Error(`Nano exited with code ${code}`));
            }
        });

        nano.on('error', (err) => {
            console.error('Failed to start Nano:', err);
            reject(err);
        });
    });
}