import transceiver from 'transceiver';
import axios from 'axios';

const channel = transceiver.channel('apps')
  .reply({
    list,
    create,
    destroy,
  });

function list() {
  return axios.get('/api/apps')
    .then(({ data }) => data);
}

function create(name) {
  return axios.post('/api/apps', { name });
}

function destroy(name) {
  return axios.delete(`/api/apps/${name}`);
}

export default channel;
