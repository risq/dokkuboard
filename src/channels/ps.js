import transceiver from 'transceiver';
import axios from 'axios';

const channel = transceiver.channel('ps')
  .reply({
    get,
  });

function get(name) {
  return axios.get(`/api/ps/${name}`)
    .then(({ data }) => data);
}

export default channel;
