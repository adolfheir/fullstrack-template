/* 这玩意先提出来 后续处理  */
import { message } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

message.config({
  top: 28,
});

dayjs.extend(duration);

import(/* webpackChunkName: "intro" */ './app/index');
