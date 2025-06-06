import Router from 'koa-router'

const recipeRouter = new Router()

let cb = () => {
  return ['spaghetti bolognese', 'ham sandwich', 'fish and chips'];
}

recipeRouter.get('./recipes', cb)

export default recipeRouter;