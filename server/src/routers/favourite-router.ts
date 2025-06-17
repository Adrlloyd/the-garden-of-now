'use strict';

import Router from 'koa-router'

import { getFavouritesBySeason, postFavourite, deleteFavourite } from '../controllers/favouriteController';

const favouriteRouter = new Router()

favouriteRouter.post('/favourites', getFavouritesBySeason)
favouriteRouter.post('/favourite', postFavourite)
favouriteRouter.delete('/favourite/:id', deleteFavourite)

export { favouriteRouter };