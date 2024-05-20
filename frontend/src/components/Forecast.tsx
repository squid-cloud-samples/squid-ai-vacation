import { OneDayForecast, PackingItem } from '../../../common/types';

type PropTypes = {
    forecast: OneDayForecast;
}

const Forecast = ({ forecast }: PropTypes) => {
  return (
    <div>
      <div>{JSON.stringify(forecast)}</div>
      <div></div>
    </div>
  );
}

export default Forecast;