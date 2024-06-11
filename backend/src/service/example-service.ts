import { SquidService, secureDatabase, webhook, aiFunction, executable, trigger, TriggerRequest } from '@squidcloud/backend';
import { AiGenerateImageOptions, InstructionData } from '@squidcloud/client';
import { PackingItem, ResponseBody, OneDayForecast, ShoppingItem } from '../../../common/types';

type ShoppingItemResponse = {
  data: ShoppingItem;
}

export class ExampleService extends SquidService {
  
  collection = this.squid.collection('packing-list');

  @secureDatabase('all', 'built_in_db')
  allowAccessToBuiltInDb(): boolean {
    return true;
  }

  @executable()
  async createItemsWithAI(zipcode: number, startDate: Date, endDate: Date){
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
        await this.squid.collection('forecast').doc({date, location: zipcode}).insert(result);
        this.generatePackingList(date, result);
    }
  }

  private async generatePackingList(date: Date, dayForecast: OneDayForecast) {
    const chatbot = this.squid.ai().chatbot('packing-planner');
    const profile = chatbot.profile('planner');
    const queryResult = await profile.ask(
      `Create some packing list items for the following weather forecast: ${JSON.stringify(dayForecast)} for this date ${date}`,
      {functions: ['createPackingListFromAssistant']}
    );
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
        type: 'date',
        required: true,
      },
    ],
  )
  async createPackingListFromAssistant(params: {
    item: string;
    content: string;
    date: Date;
  }): Promise<void> {
    const { item, content, date } = params;   
    await this.createPackingItemInternal(item, content, date);
  }

  private async createPackingItemInternal(
    item: string,
    content: string,
    date: Date,
  ): Promise<void> {
    const existingItem = await this.collection.query().like('item' ,item, false).snapshot();
    if (existingItem.length > 0) {
      return;
    }
    const id = crypto.randomUUID();

    await this.collection.doc({ id }).insert({
      id,
      item,
      content,
      done: false,
      date
    });
    return;
  }

  // Trigger item search when 'packing-list' collection updates
  @trigger('packingUpdate', 'packing-list')
  async handlePackingUpdate(request: TriggerRequest): Promise<void> {
    // Only perform item search on first insert
    if (request.mutationType !== 'insert') {
      return;
    }
    const packingItemData = request.docAfter;
    // avoid requests to the API more than once
    if (packingItemData.item !== undefined && packingItemData.product_title === undefined) {
      await this.searchForItem(packingItemData.id, packingItemData.item);
    }
    return;
  }

  private async searchForItem(id: string, item: string): Promise<void> {
    const response = await this.squid.api()
    .request<ShoppingItemResponse>('product-search', 
    'search', 
    {}, 
    { 
      queryParams: {
        'country': 'us',
        'language': 'en',
        'limit': 1,
        'q': item,
    }
  });
  const data = response.body.data[0];
  const searchData = {
    product_title: data.product_title,
    product_description: data.product_description,
    product_photo: data.product_photos[0],
    product_page_url: data.product_page_url,
  };
    await this.collection.doc({id}).update(searchData);
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
    return result.body.forecast.forecastday[0].day;
  }
}
