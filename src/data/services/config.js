import axios from 'axios';

export const DataService = axios.create({ baseURL: process.env.REACT_APP_DIGI_API });
DataService.defaults.headers.post['Token'] = 'Njc5MDVhYTMtNGZjMy00MmY1LTljZTItNzQxODJmYjdiZTE4';
DataService.defaults.headers.post['Accept'] = 'yes'