import React from 'react';
import { render } from 'react-dom';

import Scheduler from 'components/Scheduler';
import { BASE_URL, SYSTEM_AUTH } from 'api/api';
import 'whatwg-fetch';

import { getManifest } from 'd2/lib/d2';

getManifest('./manifest.webapp')
    .then(manifest => `${manifest.getBaseUrl()}/api`)
    .catch(() => BASE_URL)
    .then(baseUrl => {
        const production = process.env.NODE === 'production';

        const config = {
            baseUrl,
            headers: production ? null : SYSTEM_AUTH,
        };

        render(<Scheduler config={config} />, document.getElementById('scheduler'));
    });
