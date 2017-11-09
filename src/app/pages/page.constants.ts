import { BaseUrl, Host } from '../app.constants';

export default {
  getBlogList: BaseUrl + (Host ? 'getbloglist' : 'getbloglist.json')
}