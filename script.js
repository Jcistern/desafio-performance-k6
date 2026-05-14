import http from 'k6/http';
import { check, sleep, group } from 'k6';

function loadCredentialsFromCSV(filepath) {
  const fileContent = open(filepath);
  const lines = fileContent.split('\n');
  const credentials = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if(line === '') continue;

    const parts = line.split(',');
    if (parts.length >= 2) {
      credentials.push({
        user: parts[0].trim(),
        passwd: parts[1].trim(),
      });
    }
  }
  return credentials;
}
 
const datos = JSON.parse(open('./datos.json'));
const credentials = loadCredentialsFromCSV('./credentials.csv');
const headers = {'Content-Type': 'application/json'};


function desafio_k6 (scenario) {

  const credentialIndex = __VU % credentials.length;
  const credential = credentials[credentialIndex];

  if(!credential?.user || !credential?.passwd) {
    console.log(`Credencial inválida en índice ${credentialIndex}`);
  }

  group(`Login Test [${scenario}]`, function() {
    const loginPayload = JSON.stringify({
      username: credential.user,
      password: credential.passwd,
    });

    const loginRes = http.post(`${datos.loginEndpoint}`, loginPayload, {headers, tag: {scenario: scenario}});

    if (loginRes.status !== 200) {
      console.log(`[VU ${__VU}] Status: ${loginRes.status}, Body: ${loginRes.body.substring(0, 100)}`);
    }

    check(loginRes, {
      'Login - status 2xx (disponibilidad)': (r) => r.status >= 200 && r.status < 300,
      'Login - token presente (autenticacion)': (r) => {
        try {
          const body = JSON.parse(r.body);
          const hasToken = body.token && body.token.length > 0;
          if (!hasToken) {
            console.log(`[VU ${__VU}] No token en respuesta: ${JSON.stringify(body)}`);
          }
          return hasToken;
        } catch (e) {
          console.log(`[VU ${__VU}] Error parsing JSON: ${e}`);
          return false;
        }
      },
      'Login - Latencia < 1500ms (performance)': (r) => r.timings.duration < 1500,

    });

    sleep(1);
  });
}

export const options = {
  scenarios: {
    smoke: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 5 },
        { duration: '10s',  target: 5 },
        { duration: '10s', target: 0  },
      ],
      gracefulRampDown: '30s',
      exec: 'smokeTest',
    },

    load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 20 },
        { duration: '30s',  target: 20 },
        { duration: '10s', target: 0  },
      ],
      gracefulRampDown: '30s',
      exec: 'loadTest',
    },

    stress: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 50 },
        { duration: '40s',  target: 50 },
        { duration: '20s', target: 0  },
      ],
      gracefulRampDown: '30s',
      exec: 'stressTest',
    }
  },
  thresholds: {
    'http_req_duration{scenario:smoke}': ['p(95)<700'],
    'http_req_duration{scenario:load}': ['p(95)<1500'],
    'http_req_duration{scenario:stress}': ['p(95)<2000'],

    'http_req_failed{scenario:smoke}': ['rate<0.01'],
    'http_req_failed{scenario:load}': ['rate<0.03'],
    'http_req_failed{scenario:stress}': ['rate<0.05'],
  },
};

export function setup() {
  console.log(`\nIniciando prueba de carga con ${credentials.length} credenciales`);
  console.log(`Escenarios disponibles: smoke, load, stress\n`);
  return { credentials };
}

export function teardown(data) {
  console.log(`Prueba de carga completada`);
}

export function smokeTest() {
  desafio_k6('smoke');
}

export function loadTest() {
  desafio_k6('load');
}

export function stressTest() {
  desafio_k6('stress');
}