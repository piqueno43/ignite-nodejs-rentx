"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleteUsername1631107847054 = void 0;

var _typeorm = require("typeorm");

class AlterUserDeleteUsername1631107847054 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar",
      isNullable: true
    }));
  }

}

exports.AlterUserDeleteUsername1631107847054 = AlterUserDeleteUsername1631107847054;