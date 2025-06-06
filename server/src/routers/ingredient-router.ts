import Router from 'koa-router'

const ingredientRouter = new Router()

let cb = () => {
  return ['tomato', 'aubergine', 'mozzarella', 'flour'];
}

let cb2 = () => {
  return ['tomato', 'flour', 'mozzarella']
}

ingredientRouter.get('./ingredients', cb)
ingredientRouter.get('./ingredients/:month', cb2)

export default ingredientRouter;