const Product = require('../models/product')
const { exec, spawnSync, spawn } = require('child_process');
const { timeStamp } = require('console');
const fs = require('fs');
require('dotenv').config()

const displayQues = async (req, res) => {
  try {
    // Fetch all questions from the database
    const questions = await Product.find({}, { Name: 1, _id: 0, Id: 1 });
    // console.log(questions) // Assuming your model is named Product
    res.json(questions); // Send the list of questions as JSON response
  } catch (err) {
    console.error('Error fetching questions:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const cppT1 = async (req, res) => {
  try {
    const { Id, cppCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, Output: 1, _id: 0 });
    var timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;

    console.log(IP);
    // Write the C++ code to a file
    fs.writeFileSync(`${filePath}.cpp`, cppCode);

    // Compile the C++ code using g++
    exec(`g++ -o compiled_program ${process.env.TEMP_FOLDER_URL}/${timestamp}.cpp`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Compilation error: ${error.message}`);
        res.status(500).json({ error: 'Compilation error', message: error.message });
        return;
      }
      if (stderr) {
        console.error(`Compilation stderr: ${stderr}`);
        res.status(500).json({ error: 'Compilation error', message: stderr });
        return;
      }

      // Compilation successful
      console.log('Compilation successful');

      const inputs = IP[0].Inputs;
      let output = ''; // Initialize an empty string to store the output

      // Iterate over each inner array in the Inputs field

      const innerArray = inputs[0];

      console.log(innerArray);
      const runResult = spawnSync('compiled_program', innerArray, { encoding: 'utf8' });
      output += `Input: ${innerArray.join(' ')}     ‎ ‎ ‎ ‎ ‎      Output: ${runResult.stdout}\n`; // Append the input and output to the output string

      console.log(IP[0].Output[0])
      console.log(runResult.stdout)
      fs.unlink(`${filePath}.cpp`, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }

        console.log('File deleted successfully');
      });

      if (runResult.stdout.trim() === IP[0].Output[0].toString().trim()) {
        console.log(true);
        res.status(200).json({ message: 'Execution successful', output, success: true });
      } else {
        console.log(false);
        res.status(200).json({ message: 'Execution successful', output, success: false });
      }


    });
  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }

}
const cppT2 = async (req, res) => {
  try {
    const { Id, cppCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, Output: 1, _id: 0 });
    var timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;

    console.log(IP);
    // Write the C++ code to a file
    fs.writeFileSync(`${filePath}.cpp`, cppCode);

    // Compile the C++ code using g++
    exec(`g++ -o compiled_program ${filePath}.cpp`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Compilation error: ${error.message}`);
        res.status(500).json({ error: 'Compilation error', message: error.message });
        return;
      }
      if (stderr) {
        console.error(`Compilation stderr: ${stderr}`);
        res.status(500).json({ error: 'Compilation error', message: stderr });
        return;
      }

      // Compilation successful
      console.log('Compilation successful');

      const inputs = IP[0].Inputs;
      let output = ''; // Initialize an empty string to store the output

      // Iterate over each inner array in the Inputs field

      const innerArray = inputs[1];

      console.log(innerArray);
      const runResult = spawnSync('compiled_program', innerArray, { encoding: 'utf8' });
      output += `Input: ${innerArray.join(' ')}     ‎ ‎ ‎ ‎ ‎      Output: ${runResult.stdout}\n`; // Append the input and output to the output string

      console.log(IP[0].Output[1])
      console.log(runResult.stdout)
      fs.unlink(`${filePath}.cpp`, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }

        console.log('File deleted successfully');
      });

      if (runResult.stdout.trim() === IP[0].Output[1].toString().trim()) {
        console.log(true);
        res.status(200).json({ message: 'Execution successful', output, success: true });
      } else {
        console.log(false);
        res.status(200).json({ message: 'Execution successful', output, success: false });
      }


    });
  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }

}

const compileCpp = async (req, res) => {
  try {
    const { Id, cppCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });
    var timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;

    console.log(IP);
    // Write the C++ code to a file
    fs.writeFileSync(`${process.env.TEMP_FOLDER_URL}/${timestamp}.cpp`, cppCode);

    // Compile the C++ code using g++
    exec(`g++ -o compiled_program ${process.env.TEMP_FOLDER_URL}/${timestamp}.cpp`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Compilation error: ${error.message}`);
        res.status(500).json({ error: 'Compilation error', message: error.message });
        return;
      }
      if (stderr) {
        console.error(`Compilation stderr: ${stderr}`);
        res.status(500).json({ error: 'Compilation error', message: stderr });
        return;
      }

      // Compilation successful
      console.log('Compilation successful');

      const inputs = IP[0].Inputs;
      let output = ''; // Initialize an empty string to store the output

      // Iterate over each inner array in the Inputs field
      for (let i = 0; i < inputs.length; i++) {
        const innerArray = inputs[i];

        console.log(innerArray);
        const runResult = spawnSync('compiled_program', innerArray, { encoding: 'utf8' });
        output += `Input: ${innerArray.join(' ')}\n${runResult.stdout}\n`; // Append the input and output to the output string
      }

      fs.unlink(`${filePath}.cpp`, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }

        console.log('File deleted successfully');
      });

      res.status(200).json({ message: 'Execution successful', output });
    });
  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};

const compileAndRunJava = async (req, res) => {
  try {
    const { Id, javaCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });
    var timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;

    // Write the Java code to a file
    fs.writeFileSync(`${process.env.TEMP_FOLDER_URL}/${timestamp}.java`, javaCode);
    fs.writeFileSync(`./javaRunner/Main.java`, javaCode);

    // Compile the Java code using javac
    await new Promise((resolve, reject) => {
      exec('javac .\\javaRunner\\Main.java', (error, stdout, stderr) => {
        if (error) {
          console.error(`Compilation error: ${error.message}`);
          reject(error.message);
          return;
        }
        if (stderr) {
          console.error(`Compilation stderr: ${stderr}`);
          reject(stderr);
          return;
        }

        // Compilation successful
        console.log('Compilation successful');
        resolve();
      });
    });

    const inputs = IP[0].Inputs;
    for (let i = 0; i < inputs.length; i++) {
      const innerArray = inputs[i];
      console.log(innerArray);

      // Run the Java program using java
      const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
      await new Promise((resolve, reject) => {
        const runProcess = exec(`java -classpath .\\javaRunner Main ${inputArgs}`, { stdio: 'pipe' });

        runProcess.stdout.on('data', (data) => {
          console.log(`Output: ${data}`);
        });

        runProcess.stderr.on('data', (data) => {
          console.error(`Error: ${data}`);
        });

        runProcess.on('close', (code) => {
          console.log(`Child process exited with code ${code}`);
          resolve();
        });
      });
    }
    fs.unlink(`${filePath}.java`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }

      console.log('File deleted successfully');
    });
    res.status(200).json({ message: 'Execution successful' });
  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};

const javaT1 = async (req, res) => {
  try {
    const { Id, javaCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, Output: 1, _id: 0 });
    var timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;

    // Write the Java code to a file
    fs.writeFileSync(`${filePath}.java`, javaCode);
    fs.writeFileSync(`./javaRunner/Main.java`, javaCode);

    // Compile the i code using javac
    await new Promise((resolve, reject) => {
      exec('javac .\\javaRunner\\Main.java', (error, stdout, stderr) => {
        if (error) {
          console.error(`Compilation error: ${error.message}`);
          reject(error.message);
          return;
        }
        if (stderr) {
          console.error(`Compilation stderr: ${stderr}`);
          reject(stderr);
          return;
        }

        // Compilation successful
        console.log('Compilation successful');
        resolve();
      });
    });

    const inputs = IP[0].Inputs;
    const innerArray = inputs[0];
    console.log(innerArray);

    // Run the Java program using java
    const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
    await new Promise((resolve, reject) => {
      const runProcess = exec(`java -classpath .\\javaRunner Main ${inputArgs}`, { stdio: 'pipe' });
      fs.unlink(`${filePath}.java`, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log(IP[0].Output[0].toString().trim())

      runProcess.stdout.on('data', (data) => {
        // console.log(data)
        if (data.trim() === IP[0].Output[0].toString().trim()) {
          output = ' '
          output += `Input: ${innerArray.join(' ')}     ‎ ‎ ‎ ‎ ‎      Output: ${data}\n`;
          console.log(true);
          res.status(200).json({ message: 'Execution successful', output, success: true });
        } else {
          console.log(false);
          res.status(200).json({ message: 'Execution successful', success: false });
        }

      });

      runProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
      });
      
      
        console.log('File deleted successfully');
      });


      runProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        resolve();
      });
    });


  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};
const javaT2 = async (req, res) => {
  try {
    const { Id, javaCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, Output: 1, _id: 0 });
    var timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;

    // Write the Java code to a file
    fs.writeFileSync(`${process.env.TEMP_FOLDER_URL}/${timestamp}.java`, javaCode);
    fs.writeFileSync(`./javaRunner/Main.java`, javaCode);

    // Compile the i code using javac
    await new Promise((resolve, reject) => {
      exec('javac .\\javaRunner\\Main.java', (error, stdout, stderr) => {
        if (error) {
          console.error(`Compilation error: ${error.message}`);
          reject(error.message);
          return;
        }
        if (stderr) {
          console.error(`Compilation stderr: ${stderr}`);
          reject(stderr);
          return;
        }

        // Compilation successful
        console.log('Compilation successful');
        resolve();
      });
    });

    const inputs = IP[0].Inputs;
    const innerArray = inputs[1];
    console.log(innerArray);

    // Run the Java program using java
    const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
    await new Promise((resolve, reject) => {
      const runProcess = exec(`java -classpath .\\javaRunner Main ${inputArgs}`, { stdio: 'pipe' });
      fs.unlink(`${filePath}.java`, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
      
        console.log('File deleted successfully');
      });


      runProcess.stdout.on('data', (data) => {
        console.log(data)
        if (data.trim() === IP[0].Output[1].toString().trim()) {
          output = ' '
          output += `Input: ${innerArray.join(' ')}     ‎ ‎ ‎ ‎ ‎      Output: ${data}\n`;
          console.log(true);
          res.status(200).json({ message: 'Execution successful', output, success: true });
        } else {
          console.log(false);
          res.status(200).json({ message: 'Execution successful', output, success: false });
        }

      });

      runProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
      });

      runProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        resolve();
      });
    });


  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};

const compileAndRunC = async (req, res) => {
  try {
    const { Id, cCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });
    var timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;
    // Write the C code to a file
    fs.writeFileSync(`${filePath}.c`, cCode);

    // Compile the C code using gcc
    await new Promise((resolve, reject) => {
      exec(`gcc ${filePath}.c -o ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Compilation error: ${error.message}`);
          reject(error.message);
          return;
        }
        if (stderr) {
          console.error(`Compilation stderr: ${stderr}`);
          reject(stderr);
          return;
        }

        // Compilation successful
        console.log('Compilation successful');
        resolve();
      });
    });

    const inputs = IP[0].Inputs;
    for (let i = 0; i < inputs.length; i++) {
      const innerArray = inputs[i];
      console.log(innerArray);

      // Run the C program using <timestamp>
      const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
      await new Promise((resolve, reject) => {
       
        const runProcess = exec(`${process.env.TEMP_CPP}\\${timestamp} ${inputArgs}`, { stdio: 'pipe' });
     


        runProcess.stdout.on('data', (data) => {
          console.log(`Output: ${data}`);
        });

        runProcess.stderr.on('data', (data) => {
          console.error(`Error: ${data}`);
        });

        runProcess.on('close', (code) => {
          console.log(`Child process exited with code ${code}`);
          resolve();
        });
     
      });
    }
    fs.unlink(`${filePath}.c`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
    
      console.log('File deleted successfully');
    });
    fs.unlink(`${filePath}.exe`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
    
      console.log('File deleted successfully');
    });
    

    res.status(200).json({ message: 'Execution successful' });
  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};
const runCT1 = async (req, res) => {
  try {
    const { Id, cCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, Output: 1, _id: 0 });
    var timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;
    // Write the C code to a file
    fs.writeFileSync(`${filePath}.c`, cCode);

    // Write the C code to a file
    

    // Compile the C code using gcc
    await new Promise((resolve, reject) => {
      exec(`gcc ${filePath}.c -o ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Compilation error: ${error.message}`);
          reject(error.message);
          return;
        }
        if (stderr) {
          console.error(`Compilation stderr: ${stderr}`);
          reject(stderr);
          return;
        }

        // Compilation successful
        console.log('Compilation successful');
        resolve();
      });
    });

    const inputs = IP[0].Inputs;

    const innerArray = inputs[0];
    console.log(innerArray);

    // Run the C program using <timestamp>
    const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
    await new Promise((resolve, reject) => {
      const runProcess = exec(`${process.env.TEMP_CPP}\\${timestamp} ${inputArgs}`, { stdio: 'pipe' });

      runProcess.stdout.on('data', (data) => {
        if (data.trim() === IP[0].Output[0].toString().trim()) {
          output = ' '
          output += `Input: ${innerArray.join(' ')}     ‎ ‎ ‎ ‎ ‎      Output: ${data}\n`;
          console.log(true);
          res.status(200).json({ message: 'Execution successful', output, success: true });
        } else {
          console.log(false);
          res.status(200).json({ message: 'Execution successful', output, success: false });
        }
      });

      runProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
      });

      runProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        resolve();
      });
    });
    fs.unlink(`${filePath}.c`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
    
      console.log('File deleted successfully');
    });
    fs.unlink(`${filePath}.exe`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
    
      console.log('File deleted successfully');
    });



  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};
const runCT2 = async (req, res) => {
  try {
    const { Id, cCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, Output: 1, _id: 0 });
    var timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;
    // Write the C code to a file
    fs.writeFileSync(`${filePath}.c`, cCode);

   

    // Compile the C code using gcc
    await new Promise((resolve, reject) => {
      exec(`gcc ${filePath}.c -o ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Compilation error: ${error.message}`);
          reject(error.message);
          return;
        }
        if (stderr) {
          console.error(`Compilation stderr: ${stderr}`);
          reject(stderr);
          return;
        }

        // Compilation successful
        console.log('Compilation successful');
        resolve();
      });
    });

    const inputs = IP[0].Inputs;

    const innerArray = inputs[1];
    console.log(innerArray);

    // Run the C program using <timestamp>
    const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
    await new Promise((resolve, reject) => {
      const runProcess = exec(`${process.env.TEMP_CPP}\\${timestamp} ${inputArgs}`, { stdio: 'pipe' });

      runProcess.stdout.on('data', (data) => {
        if (data.trim() === IP[0].Output[1].toString().trim()) {
          output = ' '
          output += `Input: ${innerArray.join(' ')}     ‎ ‎ ‎ ‎ ‎      Output: ${data}\n`;
          console.log(true);
          res.status(200).json({ message: 'Execution successful', output, success: true });
        } else {
          console.log(false);
          res.status(200).json({ message: 'Execution successful', output, success: false });
        }
      });

      runProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
      });

      runProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        resolve();
      });
    });
    fs.unlink(`${filePath}.c`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
    
      console.log('File deleted successfully');
    });
    fs.unlink(`${filePath}.exe`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
    
      console.log('File deleted successfully');
    });



  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};

const compileAndRunPython = async (req, res) => {
  try {
    const { Id, pythonCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });
    const timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;

    // Write the Python code to a file
    fs.writeFileSync(`${filePath}.py`, pythonCode);

    const inputs = IP[0].Inputs;
    for (let i = 0; i < inputs.length; i++) {
      const innerArray = inputs[i];
      console.log(innerArray);

      // Run the Python program using python
      const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
      await new Promise((resolve, reject) => {
        const runProcess = exec(`python ${filePath}.py ${inputArgs}`, { stdio: 'pipe' });

        runProcess.stdout.on('data', (data) => {
          console.log(`Output: ${data}`);
        });

        runProcess.stderr.on('data', (data) => {
          console.error(`Error: ${data}`);
        });

        runProcess.on('close', (code) => {
          console.log(`Child process exited with code ${code}`);
          resolve();
        });
      });
    }
    fs.unlink(`${filePath}.py`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
    
      console.log('File deleted successfully');
    });

    res.status(200).json({ message: 'Execution successful' });
  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};
const runPyT1 = async (req, res) => {
  try {
    const { Id, pythonCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, Output: 1, _id: 0 });
    const timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;
    // Write the Python code to a file
    fs.writeFileSync(`${filePath}.py`, pythonCode);

    const inputs = IP[0].Inputs;

    const innerArray = inputs[0];
    console.log(innerArray);

    // Run the Python program using python
    const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
    await new Promise((resolve, reject) => {
      const runProcess = exec(`python ${filePath}.py ${inputArgs}`, { stdio: 'pipe' });

      runProcess.stdout.on('data', (data) => {
        if (data.trim() === IP[0].Output[0].toString().trim()) {
          output = ' '
          output += `Input: ${innerArray.join(' ')}     ‎ ‎ ‎ ‎ ‎      Output: ${data}\n`;
          console.log(true);
          res.status(200).json({ message: 'Execution successful', output, success: true });
        } else {
          console.log(false);
          res.status(200).json({ message: 'Execution successful', output, success: false });
        }
      });

      runProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
      });

      runProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        resolve();
      });
    });

    fs.unlink(`${filePath}.py`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
    
      console.log('File deleted successfully');
    });



  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};
const runPyT2 = async (req, res) => {
  try {
    const { Id, pythonCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, Output: 1, _id: 0 });
    const timestamp = new Date().getTime();

    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;
    // Write the Python code to a file
    fs.writeFileSync(`${filePath}.py`, pythonCode);

    const inputs = IP[0].Inputs;

    const innerArray = inputs[1];
    console.log(innerArray);

    // Run the Python program using python
    const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
    await new Promise((resolve, reject) => {
      const runProcess = exec(`python ${filePath}.py ${inputArgs}`, { stdio: 'pipe' });

      runProcess.stdout.on('data', (data) => {
        if (data.trim() === IP[0].Output[1].toString().trim()) {
          output = ' '
          output += `Input: ${innerArray.join(' ')}     ‎ ‎ ‎ ‎ ‎      Output: ${data}\n`;
          console.log(true);
          res.status(200).json({ message: 'Execution successful', output, success: true });
        } else {
          console.log(false);
          res.status(200).json({ message: 'Execution successful', success: false });
        }
      });

      runProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
      });

      runProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        resolve();
      });
    });
    fs.unlink(`${filePath}.py`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
    
      console.log('File deleted successfully');
    });



  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};





const compileAndRunJavascript = async (req, res) => {
  try {
    const { Id, jsCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });
    const timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;

    // Write the JavaScript code to a file asynchronously
    await new Promise((resolve, reject) => {
      fs.writeFile(`${filePath}.js`, jsCode, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Execute the JavaScript code using Node.js
    const inputs = IP[0].Inputs;
    const executions = [];

    for (let i = 0; i < inputs.length; i++) {
      const inputArgs = inputs[i].join(' '); // Convert the innerArray to space-separated string

      // Execute the code asynchronously and push the promise to the executions array
      const executionPromise = new Promise((resolve, reject) => {
        exec(`node ${filePath}.js ${inputArgs}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            reject(error);
            return;
          }
          console.log(`Output: ${stdout}`);
          resolve();
        });
      });

      executions.push(executionPromise);
    }

    // Wait for all executions to finish before deleting the file
    await Promise.all(executions);

    // Delete the JavaScript file
    fs.unlink(`${filePath}.js`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
      console.log('File deleted successfully');
    });

    res.status(200).json({ message: 'Execution started' }); // Respond immediately
  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};




const runJsT2 = async (req, res) => {
  try {
    const { Id, jsCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, Output: 1, _id: 0 });
    const timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;

    // Write the JavaScript code to a file asynchronously
    await new Promise((resolve, reject) => {
      fs.writeFile(`${filePath}.js`, jsCode, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Execute the JavaScript code using Node.js
    const inputs = IP[0].Inputs;
    const inputArgs = inputs[1].join(' '); // Convert the innerArray to space-separated string

    // Execute the code asynchronously without waiting for the result
    exec(`node ${filePath}.js ${inputArgs}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      // Delete the JavaScript file after execution
      fs.unlink(`${filePath}.js`, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted successfully');
      });

      if (stdout.trim() === IP[0].Output[1].toString().trim()) {
        console.log(true);
        res.status(200).json({ message: 'Execution successful', stdout, success: true });
      } else {
        console.log(false);
        res.status(200).json({ message: 'Execution successful',  success: false });
      }
    });

  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};
const runJsT1 = async (req, res) => {
  try {
    const { Id, jsCode } = req.body;
    const IP = await Product.find({ Id: Id }, { Inputs: 1, Output: 1, _id: 0 });
    const timestamp = new Date().getTime();
    const filePath = `${process.env.TEMP_FOLDER_URL}/${timestamp}`;

    // Write the JavaScript code to a file asynchronously
    await new Promise((resolve, reject) => {
      fs.writeFile(`${filePath}.js`, jsCode, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Execute the JavaScript code using Node.js
    const inputs = IP[0].Inputs;
    const inputArgs = inputs[0].join(' '); // Convert the innerArray to space-separated string

    // Execute the code asynchronously without waiting for the result
    exec(`node ${filePath}.js ${inputArgs}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      // Delete the JavaScript file after execution
      fs.unlink(`${filePath}.js`, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted successfully');
      });

      if (stdout.trim() === IP[0].Output[0].toString().trim()) {
        console.log(true);
        res.status(200).json({ message: 'Execution successful', stdout, success: true });
      } else {
        console.log(false);
        res.status(200).json({ message: 'Execution successful',  success: false });
      }
    });

  } catch (err) {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};





module.exports = { runJsT1, runPyT1, runPyT2, runCT1, runCT2, javaT2, javaT1, cppT1, cppT2, compileCpp, displayQues, compileAndRunJava, compileAndRunC, compileAndRunPython, compileAndRunJavascript,runJsT2 }






