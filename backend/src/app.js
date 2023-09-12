/**
 * File Name: app.js
 */
const {
  express,
  cors,
  path,
  helmet,
  bodyParser,
  cookieParser,
  axios,
  // passport,
  errorHandler,
  config,
  sanitizeReqBody,
  easyLog,
  swaggerUi,
  swaggerDocument,
  graphqlServer,
} = require('./api/utils/dependencyContainer');
const passport = require('passport');
require('./api/utils/passport')(passport);

const app = express();

// set up global variables
if (config.node_env !== 'production') {
  global.zx = easyLog;
}

//public
const static_path = path.join(__dirname, '../public');
app.use(express.static(static_path));

// set up session
require('./api/utils/SessionManagement')(app, config);

// Connect Database
require('./api/db/mongoose-connection.js');
// require('./api/db/mysql-connection.js');

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(sanitizeReqBody);

// // Routes
// const routes = ['authRoutes', 'userRoutes', 'productRoutes', 'categoryRoutes', 'brandRoutes'];
// routes.forEach(route => app.use(`/api/${route}`, require(`./api/routes/${route}`)));


// Routes
const authRoutes = require('./api/routes/authRoutes');
const userRoutes = require('./api/routes/userRoutes');
const productRoutes = require('./api/routes/productRoutes');
const categoryRoutes = require('./api/routes/categoryRoutes');
const brandRoutes = require('./api/routes/brandRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// custom error handling middleware
app.use(errorHandler);
app.get('/proxy-image', async (req, res) => {
  const { imageUrl } = req.query;
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];

    res.set('Content-Type', contentType);

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

if (config.node_env === 'production') {
  app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('<h1>Hello From Node Server via nodemon</h1>');
  });
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
  process.exit(1);
});

// Start the Apollo Server
graphqlServer.listen().then(({ url }) => {
  logger.info(`GraphQL server ready at ${url}`)
});


module.exports = app;