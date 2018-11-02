/// <reference path ="../node_modules/@types/sequelize/index.d.ts" />
interface DB {
  sequelize: import("../node_modules/@types/sequelize").Sequelize;
}
declare var DB: DB;
