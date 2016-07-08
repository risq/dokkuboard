import transceiver from 'transceiver';
import axios from 'axios';

const channel = transceiver.channel('config')
  .reply({
    get,
  });

function get(name) {
  return axios.get(`/api/apps/${name}/config`)
    .then(({ data }) => data);
}

export default channel;
