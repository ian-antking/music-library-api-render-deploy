const Sequelize = require('sequelize');
const ArtistModel = require('./artist');
const AlbumModel = require('./album');
const SongModel = require('./song');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
  });

  const Artist = ArtistModel(connection, Sequelize);
  const Album = AlbumModel(connection, Sequelize);
  const Song = SongModel(connection, Sequelize);

  
  Album.belongsTo(Artist, { as: 'artist', foreignKey: { allowNull: false }, onDelete: "CASCADE"});

  Song.belongsTo(Album, { as: 'album', foreignKey: { allowNull: false }, onDelete: "CASCADE" });

  connection.sync({ alter: true });
  return {
    Artist,
    Album,
    Song
  };
};

module.exports = setupDatabase();
