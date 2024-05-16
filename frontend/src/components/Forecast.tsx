import { OneDayForecast, PackingItem } from '../../../common/types';

type PropTypes = {
    forecast: OneDayForecast;
}

const Forecast = ({ forecast }: PropTypes) => {
  return (
    <div>
        <div>{forecast.condition.text}</div>
    </div>
  );
}

export default Forecast;