process.loadEnvFile(); // Carga las variables de entorno desde el archivo .env

import { test } from 'node:test'
import assert from 'node:assert'

import { Stagehand } from '@browserbasehq/stagehand'

test('Un usuario ingresa a la JSConf y obtiene el certificado de asistencia', async () => {
    const stagehand = new Stagehand({
        env: 'LOCAL',
        model: 'gemini-2.5-flash-lite'
    })
    
    await stagehand.init()

    const [ page ] = stagehand.context.pages();
    await page.goto('https://www.jsconf.es/');

    // await stagehand.act('Click in the button "Obtener certificado de asistencia"');
    // await stagehand.act('Fill the input with an example code like "6J4G9zF"');

    // const { extraction } = await stagehand.extract('Extract the main title and certificate code');
    // console.log(extraction);

    // assert.strictEqual(extraction.title, 'Tu certificado');
    // assert.strictEqual(extraction.certificateCode, '6J4G9zF');

    await stagehand.close();
})