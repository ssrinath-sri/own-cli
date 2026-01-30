#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Welcome to No-Framework Backend Creator!');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the project name:',
      default: 'my-backend-app'
    },
    {
      type: 'list',
      name: 'runtime',
      message: 'Choose the runtime:',
      choices: ['Node.js', 'Bun']
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Choose the package manager:',
      choices: ['npm', 'pnpm']
    },
    {
      type: 'list',
      name: 'language',
      message: 'Choose the language:',
      choices: ['JavaScript', 'TypeScript']
    }
  ]);

  const { projectName, runtime, packageManager, language } = answers;

  // Create project directory
  const projectPath = path.join(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    console.error(`Directory ${projectName} already exists.`);
    process.exit(1);
  }
  fs.mkdirSync(projectPath, { recursive: true });

  // Create src directory and subfolders
  const srcPath = path.join(projectPath, 'src');
  fs.mkdirSync(srcPath);
  const folders = ['handler', 'service', 'input-validation', 'dao-layer', 'business-validation'];
  folders.forEach(folder => {
    fs.mkdirSync(path.join(srcPath, folder));
  });

  // Create package.json
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: 'A backend project created with no-framework',
    main: language === 'TypeScript' ? 'dist/index.js' : 'src/index.js',
    scripts: {
      start: language === 'TypeScript' ? 'node dist/index.js' : 'node src/index.js',
      dev: language === 'TypeScript' ? 'ts-node src/index.ts' : 'node src/index.js',
      build: language === 'TypeScript' ? 'tsc' : 'echo "No build step for JavaScript"'
    },
    keywords: ['backend'],
    author: '',
    license: 'ISC'
  };

  if (runtime === 'Bun') {
    packageJson.type = 'module';
  }

  if (language === 'TypeScript') {
    packageJson.devDependencies = {
      'typescript': '^4.9.0',
      '@types/node': '^18.0.0',
      'ts-node': '^10.9.0'
    };
  }

  fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create tsconfig.json if TypeScript
  if (language === 'TypeScript') {
    const tsconfig = {
      compilerOptions: {
        target: 'ES2020',
        module: 'commonjs',
        outDir: './dist',
        rootDir: './src',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist']
    };
    fs.writeFileSync(path.join(projectPath, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
  }

  // Create a basic index file
  const indexContent = language === 'TypeScript' ? 'console.log("Hello from No-Framework Backend!");\n' : 'console.log("Hello from No-Framework Backend!");\n';
  const indexPath = path.join(srcPath, `index.${language === 'TypeScript' ? 'ts' : 'js'}`);
  fs.writeFileSync(indexPath, indexContent);

  console.log(`Project ${projectName} created successfully!`);
  console.log(`Navigate to ${projectName} and run '${packageManager} install' to install dependencies.`);
  console.log(`Then run '${packageManager} run dev' to start development.`);
}

main().catch(console.error);