import { SquidService, secureDatabase, webhook, aiFunction, executable } from '@squidcloud/backend';
import { web } from 'webpack';
import { PackingItem, ResponseBody, OneDayForecast } from '../../../common/types';

export class ExampleService extends SquidService {
  
  collection = this.squid.collection('packing-list');

  @secureDatabase('all', 'built_in_db')
  allowAccessToBuiltInDb(): boolean {
    return true;
  }

  @executable()
  async createItemsWithAI(zipcode: number, startDate: Date, endDate: Date){
    console.log(zipcode)

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const dateWeather = `${year}-${month}-${day}`;
        const result = await this.getFutureForecast(dateWeather, zipcode);
        await this.generatePackingList(dateWeather, result);
    }


  }

  private async generatePackingList(date: string, dayForecast: OneDayForecast) {
    console.log(date)
    const assistant = this.squid.ai().assistant();
    const assistantId = await assistant.createAssistant(
      'packingListGenerator',
      'Your are designed to create a list of items to pack for a trip based on the provided weather forecast and date, where the date is a string. You should create anywhere between 3-5 items.',
      ['createPackingListFromAssistant'],
    );
    const threadId = await assistant.createThread(assistantId);

    const queryResult = await assistant.queryAssistant(
      assistantId,
      threadId,
      `Create some packing list items for the following weather forecast: ${JSON.stringify(dayForecast)} for this date ${date}`,
    );
    console.log(queryResult);

    await assistant.deleteThread(threadId);
    await assistant.deleteAssistant(assistantId);
  }

  @aiFunction(
    'This function creates a new item to pack for vacation on a list of items for a given date',
    [
      {
        name: 'item',
        description: 'The name of the item to pack',
        type: 'string',
        required: true,
      },
      {
        name: 'content',
        description:
          'The description of the item to pack, including why it needs to be packed based on the weather',
        type: 'string',
        required: true,
      },
      {
        name: 'date',
        description: 'The date of the weather as provided',
        type: 'string',
        required: true,
      },
    ],
  )
  async createPackingListFromAssistant(params: {
    item: string;
    content: string;
    date: string;
  }): Promise<void> {
    const { item, content, date } = params;   
    await this.createPackingItemInternal(item, content, date);
  }

  private async createPackingItemInternal(
    item: string,
    content: string,
    date: string,
  ): Promise<string> {
    const id = crypto.randomUUID();

    await this.collection.doc({ id }).insert({
      id,
      item,
      content,
      done: false,
      date
    });

    return id;
  }

  async getFutureForecast(date: string, zip: number) {
    const result = await this.squid.api().request<ResponseBody>(
      'weather',
      'future-weather',
      {},
      {
        queryParams: {
          key: this.secrets['weather-key'],
          q: zip,
          date: date,
        },
      },
    );
    console.log(result.body.forecast.forecastday[0].day);
    return result.body.forecast.forecastday[0].day;
  }
}
