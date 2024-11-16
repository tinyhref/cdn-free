import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { changeToSlug } from './changeToSlug';
import { Params, Data } from './types';

function getRandomValue(array: any = []) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const createPackageNpm = async (params: Params): Promise<Data> => {
  const {
    npmToken,
    packageVersion = '1.1.1',
    packageDescription = '',
    mainFile = 'index.js',
    dataFile,
    packageNames = []
  } = params;

  const filename = changeToSlug(params.filename, {
    regex: /[^ a-z0-9._-]/g
  });

  const packageName = getRandomValue(packageNames);

  const version = `${packageVersion}-${Date.now()}`

  const packageJsonContent = {
    name: packageName,
    version,
    description: packageDescription,
    main: mainFile,
    scripts: {},
    keywords: ['CDN Free', 'cdn free', 'jsdelivr', 'unpkg'],
    author: 'TinyHref',
    license: 'MIT'
  };

  const packageDir = path.join(__dirname, packageName);

  fs.mkdirSync(packageDir, { recursive: true });

  fs.writeFileSync(path.join(packageDir, 'package.json'), JSON.stringify(packageJsonContent, null, 2));

  const mainFileContent = `// ${mainFile}\nconsole.log('Hello World - ${packageName}!');`;
  fs.writeFileSync(path.join(packageDir, mainFile), mainFileContent);

  const npmrcContent = `registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=${npmToken}\n`;
  fs.writeFileSync(path.join(packageDir, '.npmrc'), npmrcContent);

  const filePath = path.join(packageDir, filename);

  // console.log('filePath', filePath, filename)

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, dataFile, (err) => {
      exec(`cd ${packageDir} && yarn publish`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error publishing package: ${error.message}`);
          reject()
          return;
        }

        if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject()
          return;
        }

        console.log(`Package published successfully`);

        const dataResponse: Data = {
          filename,
          version,
          packageName
        }

        resolve(dataResponse);

        try {
          fs.rmSync(packageDir, { recursive: true, force: true });
          // console.log(`Directory ${packageDir} has been removed.`);
        } catch (err) {
          // console.error(`Error removing directory: ${err.message}`);
        }
      });
    })
  })
}

export default createPackageNpm