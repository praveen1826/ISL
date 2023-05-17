import axios from 'axios';

export default axios.create({
  baseURL: 'http://20.219.13.160:8000/Text2Image/convert',
});
