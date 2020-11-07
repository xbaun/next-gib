import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { NextApiRequest, NextApiResponse } from 'next';
import { bootstrap } from '../../server/main';

const server = express();

bootstrap(new ExpressAdapter(server)).then(app => app.init());

export default async (request: NextApiRequest, response: NextApiResponse) => {
    server(request, response);
}
