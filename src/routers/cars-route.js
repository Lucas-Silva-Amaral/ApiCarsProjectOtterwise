import multer from "fastify-multer"
import path from "path"
import * as CarController from "../controllers/cars-controller.js"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname)
    cb(null, file.fieldname + "-" + Date.now() + extension)
  },
})

const upload = multer({ storage })

const carsRoutes = {
  showAllCars: {
    method: "GET",
    url: "/cars",
    handler: CarController.index,
  },

  createCars: {
    method: "POST",
    url: "/cars",
    preHandler: upload.single("image"),
    handler: CarController.create,
  },

  updateCar: {
    method: "PUT",
    url: "/cars/:id",
    preHandler: upload.single("image"),
    handler: CarController.update,
  },

  updateCarAtribute: {
    method: "PATCH",
    url: "/cars/:id",
    preHandler: upload.single("image"),
    handler: CarController.update,
  },

  deleteCar: {
    method: "DELETE",
    url: "/cars/:id",
    handler: CarController.remove,
  },
}

const route = { ...carsRoutes }

const renderRoutes = Object.values(route)

export default (fastify, _, next) => {
  for (const route of renderRoutes) {
    fastify.route(route)
  }
  next()
}
