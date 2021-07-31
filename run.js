#!/usr/bin/node

const { exec } = require('child_process');
const fs = require('fs');
const args = process.argv.slice(2);

const basePath = './dist/apps';

function build() {
    exec('rm -rf dist');

    exec('ls apps/', (error, stdout, stderr) => {
        const apps = stdout.split('\n').filter((path) => path);

        for (const app of apps) {
            exec(`tsc --build ./apps/${app}/tsconfig.json`);

            if (app === 'gateway') {
                exec(`mkdir -p ${basePath}/gateway/src/controllers/protos`);
                exec(`cp ./apps/gateway/src/controllers/protos/* ${basePath}/gateway/src/controllers/protos/`);
            } else {
                exec(`mkdir -p ${basePath}/${app}/src/protos`);
                exec(`cp ./apps/${app}/src/protos/* ${basePath}/${app}/src/protos`);
            }
        }
    });
}

switch (args[0]) {
    case 'apps:list':
        exec('ls apps/', (error, stdout, stderr) => {
            const apps = stdout.split('\n').filter((path) => path);
            for (const app of apps) {
                console.log(` - ${app}`);
            }
        });
        break;
    case 'apps:build':
        build();
        break;
    case 'apps:new':
        const appName = args[1];
        if (!appName) {
            console.log('Require app name');
            return;
        }

        const tsConfig = {
            "extends": "../../tsconfig.base.json",
            "compilerOptions": {
                "module": "commonjs",
                "outDir": "../../dist",
                "declaration": true,
                "types": ["node"],
                "target": "es6"
            },
            "exclude": [],
            "include": ["**/*.ts"]
        };

        exec(`mkdir -p apps/${appName}/src \\
            && mkdir -p apps/${appName}/src/protos \\
            && echo "syntax = "proto3";" > apps/${appName}/src/protos/${appName}.proto \\
            && touch apps/${appName}/src/app.ts`);

        fs.writeFileSync(`apps/${appName}/tsconfig.json`, JSON.stringify(tsConfig, null, 4));
}
