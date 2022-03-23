import Fastify from "fastify"
import multer from "fastify-multer"
import fastifyStatic from "fastify-static"
import helmet from "fastify-helmet"
import path from "path"
import cors from "fastify-cors"
import carsRoutes from "../routers/cars-route.js"
import brandRoutes from "../routers/brand-route.js"

const __dirname = path.resolve()

const serv = Fastify({
  logger: true,
})

serv.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
})

serv.register(cors, {
  origin: (origin, cb) => {
    cb(null, true)
    return
  },
})
serv.register(multer.contentParser)
serv.register(helmet)
serv.register(carsRoutes)
serv.register(brandRoutes)

serv.listen(3000, (err, address) => {
  if (err) {
    serv.log.error(err)
    process.exit(1)
  }
  serv.log.info(`server listening on ${address}`)
})

export default serv
