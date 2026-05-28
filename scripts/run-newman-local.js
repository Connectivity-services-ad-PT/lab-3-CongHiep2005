const { spawn } = require('child_process');

const collections = [
  "postman/collections/FIT4110_lab03_iot_ingestion.postman_collection.json"
];

const envFile = 'postman/environments/FIT4110_lab03_local.postman_environment.json';
const baseUrl = process.env.BASE_URL || 'http://localhost:8000';

async function runAll() {
  let finalExit = 0;
  for (const col of collections) {
    // eslint-disable-next-line no-await-in-loop
    const code = await runOnce(col);
    if (code !== 0) finalExit = code;
  }
  process.exit(finalExit);
}

function runOnce(collectionPath) {
  return new Promise((resolve) => {
    const name = collectionPath.split('/').pop().replace(/\.postman_collection.json$/, '');
    const outXml = `reports/newman-local-${name}.xml`;
    const cmd = `npx newman run ${collectionPath} -e ${envFile} --env-var baseUrl=${baseUrl} --reporters cli,junit --reporter-junit-export ${outXml}`;
    console.log('Running:', cmd);
    const proc = spawn(cmd, { shell: true, stdio: 'inherit' });
    proc.on('exit', (code) => {
      console.log(`${collectionPath} finished with code`, code);
      resolve(code === null ? 0 : code);
    });
    proc.on('error', (err) => {
      console.error('Newman error:', err);
      resolve(1);
    });
  });
}

runAll();
