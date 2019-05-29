import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default (time: string): string => {
  const isValidTime = time && dayjs(time).isValid();

  return isValidTime ? dayjs(time).fromNow() : '-';
};
