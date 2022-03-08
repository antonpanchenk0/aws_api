import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerJsDoc from 'swagger-jsdoc';
import * as dotenv from 'dotenv';

import logger from './logger';

dotenv.config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Even More Mailer API Docs',
      version: '1.0.0',
      description: 'This is the REST API application on NodeJS. Special for Even More Academy Mailer system.',
      contact: {
        name: 'Anton Panchenko',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api-v1/`,
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./**/*.docs.{ts, js}', './**/*.routes.{ts, js}'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const start = async (): Promise<void> => {
  const App = express();

  App.use(cors());
  App.options('', cors());

  App.use(bodyParser.json({ limit: '100mb' }));
  App.use(express.urlencoded({ extended: true }));

  App.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  App.listen(process.env.PORT, () => {
    logger.info(`Mailer service started. ${process.env.HOST}`);
  });
};

start();
