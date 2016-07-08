import transceiver from 'transceiver';
import axios from 'axios';

const channel = transceiver.channel('logs')
  .reply({
    get,
  });

function get(name) {
  return axios.get(`/api/apps/${name}/logs`)
    .then(({ data }) => data);
}

export default channel;
