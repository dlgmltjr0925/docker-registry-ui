import { NextApiRequest, NextApiResponse } from 'next';
import {
  REGISTRY_FILE_PATH,
  getRegistries,
  getRegistyUrl,
  response404,
  response500,
} from '../../../utils/api';

import { ApiResult } from '../../../interfaces/api';
import { Registry } from '../../../interfaces';
import axios from 'axios';
import fs from 'fs';

const get = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await getRegistries();

    res.status(200).json(data.list);
  } catch (error) {
    throw error;
  }
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getRegistries();

  const { name, url } = req.body;

  const { authorization } = req.headers;

  try {
    let registryUrl = getRegistyUrl(url);

    const headers: { authorization?: string } = {};

    if (authorization) headers.authorization = authorization;

    const result = await axios.get(registryUrl + '/', {
      headers,
    });

    if (result && result.status === 200) {
      const registry: Registry = { id: ++data.lastId, name, url };
      if (authorization) registry.token = authorization.split(' ')[1];

      data.list.push(registry);

      fs.writeFileSync(
        REGISTRY_FILE_PATH,
        JSON.stringify(data, null, 2),
        'utf8'
      );

      const result: ApiResult<Registry> = {
        status: 200,
        message: 'success',
        data: registry,
      };

      res.status(200).json(result);
    }
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        const result: ApiResult = {
          status: 401,
          message:
            'You do not have access rights. \nPlease check your username and password.',
          data: {},
        };
        // res.setHeader('www-authenticate', 'Basic realm="Registry Realm"');
        return res.status(200).json(result);
      }
    } else if (error.errno === -3008) {
      const result: ApiResult = {
        status: 400,
        message: 'Invalid url. \nPlease check the url.',
        data: {},
      };
      return res.status(200).json(result);
    }
    throw error;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        await get(req, res);
        break;
      case 'POST':
        await post(req, res);
        break;
      default:
        response404(res);
        break;
    }
  } catch (error) {
    response500(res);
  }
};

export default handler;
