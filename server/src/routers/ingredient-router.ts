import Router from 'koa-router'

const ingredientRouter = new Router()

let cb = () => {
  return ['tomato', 'mozzarella', 'flour'];
}

ingredientRouter.get('./ingredients', cb)

export default ingredientRouter;