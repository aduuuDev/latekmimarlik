import { exec } from 'child_process';
import { promisify } from 'util';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { join } from 'path';

// Convert exec to Promise
const execPromise = promisify(exec);

// Handle POST requests - Run a script
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Unauthorized: You must be logged in to perform this action'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get script name from request body
    const { script } = await request.json();
    
    // Validate script name (only allow specific scripts)
    const allowedScripts = [
      'seed-services.js',
      'seed-service-details.js',
      'seed-projects.js',
      'seed-blogs.js'
    ];
    
    if (!script || !allowedScripts.includes(script)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid script specified'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Execute the script
    const { stdout, stderr } = await execPromise(`node ${script}`, {
      cwd: process.cwd() // Execute in the root directory of the project
    });
    
    // Check for errors
    if (stderr) {
      console.error(`Script execution error: ${stderr}`);
      return new Response(JSON.stringify({
        success: false,
        error: `Script execution error: ${stderr}`
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Return success
    return new Response(JSON.stringify({
      success: true,
      message: 'Script executed successfully',
      output: stdout
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error running script:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: `Error running script: ${error.message}`
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
