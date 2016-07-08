import transceiver from 'transceiver';
import axios from 'axios';

const channel = transceiver.channel('urls')
  .reply({
    get,
  });

function get(name) {
  return axios.get(`/api/apps/${name}/urls`)
    .then(({ data }) => data);
}

export default channel;
