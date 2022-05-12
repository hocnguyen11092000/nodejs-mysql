const { Op } = require("sequelize");
const db = require("../models");
const Product = db.products;

class ApiFeature {
  constructor(modal, queryStr) {
    this.modal = modal;
    this.queryStr = queryStr;
    this.query = undefined;
  }

  search() {
    const keyword = this.queryStr.keyword ? this.queryStr.keyword : "";

    this.query = this.modal.findAll({
      where: {
        title: {
          [Op.eq]: keyword,
        },
      },
    });
    return this;
  }

  filter(resultPerPage) {
    const queryCopy = { ...this.queryStr };

    const currentIndex = Number(this.queryStr.page - 1) * resultPerPage;

    this.query = this.modal.findAll({
      where: {
        [Op.and]: [
          {
            price: {
              [Op.lte]: queryCopy?.price?.lte || "",
              [Op.gte]: queryCopy?.price?.gte || "",
            },
          },
          {
            title: {
              [Op.eq]: queryCopy?.keyword,
            },
          },
        ],
      },
      offset: currentIndex,
      limit: resultPerPage * this.queryStr.page - 1,
    });
    return this;
  }

  pagination(resultPerPage) {
    const currentIndex = Number(this.queryStr.page - 1) * resultPerPage;

    this.query = this.modal.findAll({
      offset: currentIndex,
      limit: resultPerPage * this.queryStr.page - 1,
    });

    return this;
  }
}

module.exports = ApiFeature;
