# Squid AI Vacation Packing Planner

This application integrates with [WeatherAPI.com](https://www.weatherapi.com/) to get the forecast for a given location and date, and then passes the information to a [Squid AI Assistant](https://docs.squid.cloud/docs/ai/squid-ai-assistant) that uses an [AI function](https://docs.squid.cloud/docs/development-tools/backend/ai-functions) to write suggested packing items to Squid's [built-in database](https://docs.squid.cloud/docs/integrations/database/built-in), and even provides links to suggested items to purchase from Google Shopping using a [Real-time Product Search API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-product-search/), showcasing how simple it is to integrate multiple services with AI functionality using Squid. 

The frontend is a React application that uses [Vite](https://vitejs.dev/).

## Prerequisites

For this project you will need:

- NodeJS v18 or later.
- [Vite](https://vitejs.dev/).
- A Squid Cloud account and a Squid application. To sign up for Squid, go to [Squid Cloud Console](https://console.squid.cloud). Once signed up, you can create an application.
- The Squid Cloud CLI (`npm i @squidcloud/cli`).

## Environment configuration

### Setting up your `.env` file

After cloning this project, go to the [Squid Cloud Console](https://console.squid.cloud), create an application (if haven't done so already) and click the **Create .env file** button under **Backend project**. This provides you with the command to create the `.env` file required for this template to work and run.

Change to the backend directory, and install the required dependencies:

```bash
cd backend
npm install
```

Run the initialization command you copied from the console. The command has the following format:

```bash
squid init-env \
 --appId YOUR_APP_ID \
 --apiKey YOUR_API_KEY \
 --environmentId YOUR_ENVIRONMENT_ID \
 --squidDeveloperId YOUR_SQUID_DEVELOPER_ID \
 --region YOUR_REGION
```

### Finalizing setup

Open a new terminal window and navigate to the `frontend` directory. You should now have two terminal windows open: one in which you will run the local backend server, and one in which you will run the frontend. Complete the environment setup with the following steps, ensuring you're in the `frontend` directory:

```bash
npm run setup-env
```

This command prepares your `.env` file for the Vite environment by generating a `frontend/.env.local` file.

### Integrating with WeatherAPI.com

To get weather forecasts, this application uses an API available from [WeatherAPI.com](https://weatherapi.com). The API offers a free tier so you can use it in this sample at no charge.

To integrate the WeatherAPI with Squid, add a new HTTP API integration in the Squid Cloud Console. To learn more, check out the [documentation on HTTP API integrations](https://docs.squid.cloud/docs/integrations/api/httpapi). For this application, you can alternatively generate the API integration using the following cURL commands, changing the placeholders:

```bash
curl -X PUT https://console.YOUR_REGION.squid.cloud/openapi/iac/applications/YOUR_APP_ID-dev/integrations/weather -H "x-app-api-key: YOUR_SQUID_API_KEY" -H "Content-Type: application/json" -d '{
  "id": "weather",
  "configuration": {
    "discoveryOptions": {}
  },
  "type": "api"
}'
```

```bash
curl -X PUT https://console.YOUR_REGION.squid.cloud/openapi/iac/applications/YOUR_APP_ID-dev/integrations/weather/schema -H "x-app-api-key: YOUR_SQUID_API_KEY" -H "Content-Type: application/json" -d '{
  "type": "api",
  "baseUrl": "https://api.weatherapi.com/v1",
  "endpoints": {
    "realtime-weather": {
      "relativePath": "/current.json",
      "method": "get",
      "requestSchema": {
        "q": {
          "location": "query",
          "description": null
        },
        "lang": {
          "location": "query",
          "description": null
        }
      },
      "responseSchema": {},
      "injectionSchema": null,
      "tags": null
    },
    "forecast-weather": {
      "relativePath": "/forecast.json",
      "method": "get",
      "requestSchema": {
        "q": {
          "location": "query",
          "description": null
        },
        "days": {
          "location": "query",
          "description": null
        },
        "dt": {
          "location": "query",
          "description": null
        },
        "unixdt": {
          "location": "query",
          "description": null
        },
        "hour": {
          "location": "query",
          "description": null
        },
        "lang": {
          "location": "query",
          "description": null
        },
        "alerts": {
          "location": "query",
          "description": null
        },
        "aqi": {
          "location": "query",
          "description": null
        },
        "tp": {
          "location": "query",
          "description": null
        }
      },
      "responseSchema": {},
      "injectionSchema": null,
      "tags": null
    },
    "future-weather": {
      "relativePath": "/future.json",
      "method": "get",
      "requestSchema": {
        "q": {
          "location": "query",
          "description": null
        },
        "dt": {
          "location": "query",
          "description": null
        },
        "lang": {
          "location": "query",
          "description": null
        }
      },
      "responseSchema": {
        "location": {
          "location": "body",
          "path": "location",
          "description": null
        },
        "forecast": {
          "location": "body",
          "path": "forecast",
          "description": null
        }
      },
      "injectionSchema": null,
      "tags": null
    },
    "history-weather": {
      "relativePath": "/history.json",
      "method": "get",
      "requestSchema": {
        "q": {
          "location": "query",
          "description": null
        },
        "dt": {
          "location": "query",
          "description": null
        },
        "unixdt": {
          "location": "query",
          "description": null
        },
        "end_dt": {
          "location": "query",
          "description": null
        },
        "unixend_dt": {
          "location": "query",
          "description": null
        },
        "hour": {
          "location": "query",
          "description": null
        },
        "lang": {
          "location": "query",
          "description": null
        }
      },
      "responseSchema": {},
      "injectionSchema": null,
      "tags": null
    },
    "marine-weather": {
      "relativePath": "/marine.json",
      "method": "get",
      "requestSchema": {
        "q": {
          "location": "query",
          "description": null
        },
        "days": {
          "location": "query",
          "description": null
        },
        "dt": {
          "location": "query",
          "description": null
        },
        "unixdt": {
          "location": "query",
          "description": null
        },
        "hour": {
          "location": "query",
          "description": null
        },
        "lang": {
          "location": "query",
          "description": null
        }
      },
      "responseSchema": {},
      "injectionSchema": null,
      "tags": null
    },
    "search-autocomplete-weather": {
      "relativePath": "/search.json",
      "method": "get",
      "requestSchema": {
        "q": {
          "location": "query",
          "description": null
        }
      },
      "responseSchema": {},
      "injectionSchema": null,
      "tags": null
    },
    "ip-lookup": {
      "relativePath": "/ip.json",
      "method": "get",
      "requestSchema": {
        "q": {
          "location": "query",
          "description": null
        }
      },
      "responseSchema": {},
      "injectionSchema": null,
      "tags": null
    },
    "time-zone": {
      "relativePath": "/timezone.json",
      "method": "get",
      "requestSchema": {
        "q": {
          "location": "query",
          "description": null
        }
      },
      "responseSchema": {},
      "injectionSchema": null,
      "tags": null
    },
    "astronomy": {
      "relativePath": "/astronomy.json",
      "method": "get",
      "requestSchema": {
        "q": {
          "location": "query",
          "description": null
        },
        "dt": {
          "location": "query",
          "description": null
        }
      },
      "responseSchema": {},
      "injectionSchema": {},
      "tags": null
    }
  },
  "injectionSchema": null
}'
```


WeatherAPI request require an API key. With Squid, you can securely store your API key using [Squid Secrets](https://docs.squid.cloud/docs/development-tools/client-sdk/secrets), and even automatically include the key with all requests using Squid's [injection](https://docs.squid.cloud/docs/integrations/api/httpapi#injections) feature.

1. In the Squid Cloud Console, navigate to your **weather** integration schema. 

2. Click on the base URL, which is `https://api.weatherapi.com/v1`.

3. Click the **+** in the **Injections** area to add a new injection.

4. The **Field name** is **key** and the **Location** is **query**. Toggle **Secret** on, and then create a new secret. For the secret value, paste in your WeatherAPI.com API key. Ensure that the secret is saved and selected, and then save the new injection.

## Integrating with the Real-time Product Search API

1. Navigate to the [Real-time Product Search API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-product-search/), and subscribe. Like the WeatherAPI.com API, you will need your API key.

2. Generate your Squid integration using the following commands, replacing the placeholders with information from your Squid app:

```bash
curl -X PUT https://console.YOUR_REGION.aws.squid.cloud/openapi/iac/applications/YOUR_APP_ID-dev/integrations/product-search -H "x-app-api-key: YOUR_SQUID_API_KEY" -H "Content-Type: application/json" -d '{
  "id": "product-search",
  "configuration": {
    "discoveryOptions": {}
  },
  "type": "api"
}'
```

```bash
curl -X PUT https://console.YOUR_REGION.squid.cloud/openapi/iac/applications/YOUR_APP_ID-dev/integrations/product-search/schema -H "x-app-api-key: YOUR_SQUID_API_KEY" -H "Content-Type: application/json" -d '{
  "type": "api",
  "baseUrl": "https://real-time-product-search.p.rapidapi.com",
  "endpoints": {
    "search": {
      "relativePath": "search",
      "method": "get",
      "requestSchema": {
        "q": {
          "location": "query",
          "description": null
        },
        "country": {
          "location": "query",
          "description": null
        },
        "language": {
          "location": "query",
          "description": null
        },
        "limit": {
          "location": "query",
          "description": null
        },
        "sort_by": {
          "location": "query",
          "description": null
        }
      },
      "responseSchema": {
        "data": {
          "location": "body",
          "path": "data",
          "description": null
        }
      },
      "injectionSchema": {
        "X-RapidAPI-Host": {
          "value": "real-time-product-search.p.rapidapi.com",
          "type": "regular",
          "location": "header"
        }
      },
      "tags": null
    }
  },
  "injectionSchema": null
}'
```

3. In the Squid Cloud Console, navigate to your **product-search** integration schema. 

2. Click on the **search** endpoing.

3. Click the **+** in the **Injections** area to add a new injection.

4. The **Field name** is **X-RapidAPI-Key** and the **Location** is **header**. Toggle **Secret** on, and then create a new secret. For the secret value, paste in your RapidAPI API key. Ensure that the secret is saved and selected, and then save the new injection.

## Adding the chatbot integration

## Running the application

### Starting the local backend server

To launch the local backend server of your Squid application, run the following command from the `backend` directory:

```bash
squid start
```

You'll see output similar to the following, indicating that your server is up and running:

```bash
> nodemon --watch ./src --exec ts-node -r tsconfig-paths/register src/main.ts
[Nest] 68047  - 03/15/2024, 7:55:23 PM     LOG [NestApplication] Nest application successfully started +1ms
```

### Launching the frontend server

Initialize the frontend server by running the following commands in the `frontend` directory:

```bash
npm install
npm run dev
```

Verify that Vite server has started, providing URLs to access your app:

```bash
  VITE v5.1.6  ready in 149 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Exploring your Squid application

With both servers running, visit [http://localhost:5173/](http://localhost:5173/) in your web browser. You're now ready to experiment with the count button and explore the functionalities of your Squid Cloud application:

1. Enter a zip code for a prospective vactaion destination. For example, 90210.
2. Enter a start and end vacation date within the next 14-90 days. For demonstration purposes, this application limits you to a 5 day vacation. This helps limit the number of API calls the app makes.
3. Click **Submit**, and watch as your suggested packing items roll in!

## Next steps

- To learn more about the Squid AI Chatbot integration, view the [documentation](https://docs.squid.cloud/docs/ai/ai-chatbot).
- To learn more about Squid's real-time data capabilities, view the [Client SDK documentation](https://docs.squid.cloud/docs/development-tools/client-sdk/). 
- To find out how to integrate with your own data sources, view the [Database integrations documentation](https://docs.squid.cloud/docs/integrations/database/).
