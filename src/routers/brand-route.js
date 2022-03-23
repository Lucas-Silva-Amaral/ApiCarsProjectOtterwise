import * as BrandController from "../controllers/brand-controller.js"

const brandRoutes = {
  showAllBrands: {
    method: "GET",
    url: "/brands",
    handler: BrandController.index,
  },

  createBrand: {
    method: "POST",
    url: "/brands",
    handler: BrandController.create,
  },

  updateNameBrand: {
    method: "PUT",
    url: "/brands/:id",
    handler: BrandController.update,
  },

  deleteBrand: {
    method: "DELETE",
    url: "/brands/:id",
    handler: BrandController.remove,
  },
}

const route = { ...brandRoutes }

const renderRoutes = Object.values(route)

export default (fastify, _, next) => {
  for (const route of renderRoutes) {
    fastify.route(route)
  }
  next()
}
