import http from 'k6/http';
import { check, sleep } from 'k6';

const datos = JSON.parse(open('./datos.json'));

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s',  target: 5 },
    { duration: '10s', target: 0  },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed:   ['rate<0.01'],
  },
};

const headers = {'Content-Type': 'application/json'};

export default function () {

  // GET lista de posts
  const listaRes = http.get(`${datos.baseUrl}/posts`, { headers });
  check(listaRes, {
    'GET posts - status 200': (r) => r.status === 200,
    'GET posts - tiene datos': (r) => {
      const body = JSON.parse(r.body);
      return Array.isArray(body) && body.length > 0;
    },
  });

  sleep(1);

  // GET posts por ID
  const postRes = http.get(`${datos.baseUrl}/posts/${datos.postId}`, { headers });
  check(postRes, {
    'GET post - status 200': (r) => r.status === 200,
    'GET post - id correcto': (r) => JSON.parse(r.body).id === Number.parseInt(datos.postId)
  });

  sleep(1);

  // POST crear usuario
  const crearRes = http.post(`${datos.baseUrl}/posts`,
    JSON.stringify({ title: datos.post.titulo, body: datos.post.cuerpo, userId: datos.post.userId }),
    { headers }
  );
  check(crearRes, {
    'POST crear - status 201': (r) => r.status === 201,
    'POST crear - titulo correcto': (r) => JSON.parse(r.body).title === datos.post.titulo,
  });

  sleep(1);
}