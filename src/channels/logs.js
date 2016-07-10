import transceiver from 'transceiver';
import axios from 'axios';

const channel = transceiver.channel('logs')
  .reply({
    get,
  });

function get(name) {
  return axios.get(`/api/logs/${name}`)
    .then(({ data }) => data);
}

export default channel;
