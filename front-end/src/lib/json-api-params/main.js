"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.JsonApiParams = void 0;
const qs = require("qs");
class JsonApiParams {
  /**
   * Optionaly initialize with a previously stored query/object/query string.
   *
   * @category Init
   */
  constructor(input) {
    this.data = {
      filter: {},
      include: [],
      page: undefined,
      sort: [],
      fields: {},
    };
    this.qsOptions = {};
    this.initialize(input);
  }
  /**
   * Add custom parameter to the query.
   *
   * E.g. usage
   *
   * ```js
   * apiParams
   *   // To add `foo=bar` to the query.
   *   .addCustomParam({foo: 'bar'})
   *   // To add `foo[bar]=baz` to the query.
   *   .addCustomParam({ foo: {bar: 'baz'}})
   *   // To add `bar[0]=a&bar[1]=b&bar[2]=c` to the query.
   *   .addCustomParam({ bar: ['a', 'b', 'c']})
   * ```
   *
   * @param input The parameter object
   *
   * @category Helper
   */
  addCustomParam(input) {
    this.data = Object.assign(Object.assign({}, this.data), input);
  }
  /**
   * Add JSON:API field.
   *
   * The name of this method might be miss leading. Use this to explicitely request for specific fields on an entity.
   *
   * @param type Resource type
   * @param fields Array of field names in the given resource type
   *
   * @category JSON:API Query
   */
  addFields(type, fields) {
    this.data.fields[type] = fields.join(",");
    return this;
  }
  /**
   * Add JSON:API sort.
   *
   * Used to return the list of items in specific order.
   *
   * @param path A 'path' identifies a field on a resource
   * @param direction Sort direction `ASC` or `DESC`
   *
   * @category JSON:API Query
   */
  addSort(path, direction) {
    let prefix = "";
    if (direction !== undefined && direction === "DESC") {
      prefix = "-";
    }
    this.data.sort = this.data.sort.concat(prefix + path);
    return this;
  }
  /**
   * Add JSON:API page limit.
   *
   * Use to restrict max amount of items returned in the listing.
   * Using this for pagination is tricky, and make sure you read
   * the following document on Drupal.org to implement it correctly.
   *
   * @param limit Number of items to limit to
   *
   * @category JSON:API Query
   */
  addPageLimit(limit) {
    if (this.data.page === undefined) {
      this.data.page = {limit};
    } else {
      this.data.page.limit = limit;
    }
    return this;
  }
  /**
   * Add JSON:API page offset.
   *
   * Use to skip some items from the start of the listing.
   * Using this for pagination is tricky, and make sure you read
   * the following document on Drupal.org to implement it correctly.
   *
   * @param offset Number of items to skip from the begining.
   *
   * @category JSON:API Query
   */
  addPageOffset(offset) {
    if (this.data.page === undefined) {
      this.data.page = {offset};
    } else {
      this.data.page.offset = offset;
    }
    return this;
  }
  /**
   * Add JSON:API include.
   *
   * Used to add referenced resources inside same request.
   * Thereby preventing additional api calls.
   *
   * @param fields Array of field names
   *
   * @category JSON:API Query
   */
  addInclude(fields) {
    this.data.include = this.data.include.concat(fields);
    return this;
  }
  /**
   * Add JSON:API group.
   *
   * @param name Name of the group
   * @param conjunction All groups have conjunctions and a conjunction is either `AND` or `OR`.
   * @param memberOf Name of the group, this group belongs to
   *
   * @category JSON:API Query
   */
  addGroup(name, conjunction = "OR", memberOf) {
    this.data.filter[name] = {
      group: Object.assign({conjunction}, memberOf !== undefined && {memberOf}),
    };
    return this;
  }
  /**
   * Add JSON:API filter.
   *
   * Following values can be used for the operator. If none is provided, it assumes "`=`" by default.
   * ```
   *   '=', '<>',
   *   '>', '>=', '<', '<=',
   *   'STARTS_WITH', 'CONTAINS', 'ENDS_WITH',
   *   'IN', 'NOT IN',
   *   'BETWEEN', 'NOT BETWEEN',
   *   'IS NULL', 'IS NOT NULL'
   * ```
   *
   * **NOTE: Make sure you match the value supplied based on the operators used as per the table below**
   *
   * | Value Type | Operator | Comment |
   * | ---   | ---  | ---         |
   * | `string`     | `=`, `<>`, `>`, `>=`, `<`, `<=`, `STARTS_WITH`, `CONTAINS`, `ENDS_WITH` | |
   * | `string[]`    | `IN`, `NOT IN` | |
   * | `string[]` _size 2_ | `BETWEEN`, `NOT BETWEEN` | The first item is used for min (start of the range), and the second item is used for max (end of the range).
   * | `null`    | `IS NULL`, `IS NOT NULL` | Must use `null`
   *
   * @param path A 'path' identifies a field on a resource
   * @param value string[] | null` | A 'value' is the thing you compare against. For operators like "IN" which supports multiple parameters, you can supply an array.
   * @param operator An 'operator' is a method of comparison
   * @param memberOf Name of the group, the filter belongs to
   *
   * @category JSON:API Query
   */
  addFilter(path, value, operator = "=", memberOf) {
    const name = this.getIndexId(this.data.filter, path);
    // Instead of relying on users supplying 'null' value, we
    // hardcode value to 'null'. This should improve DX and be
    // in line with how Condition query works in Drupal's PHP api.
    if (operator === "IS NULL" || operator === "IS NOT NULL") {
      value = null;
    }
    // Allow null values only for IS NULL and IS NOT NULL operators.
    if (value === null) {
      if (!(operator === "IS NULL" || operator === "IS NOT NULL")) {
        throw new TypeError(`Value cannot be null for the operator "${operator}"`);
      }
      this.data.filter[name] = {
        condition: Object.assign(Object.assign({path}, {operator}), memberOf !== undefined && {memberOf}),
      };
      return this;
    }
    if (Array.isArray(value)) {
      switch (operator) {
        case "BETWEEN":
        case "NOT BETWEEN":
          if (value.length !== 2) {
            throw new TypeError(`Value must consists of 2 items for the "${operator}"`);
          }
          break;
        case "IN":
        case "NOT IN":
          break;
        default:
          throw new TypeError(`Value cannot be an array for the operator "${operator}"`);
      }
      this.data.filter[name] = {
        condition: Object.assign(Object.assign({path, value}, {operator}), memberOf !== undefined && {memberOf}),
      };
      return this;
    }
    // Validate filter
    if (memberOf === undefined && path === name && this.data.filter[path] === undefined) {
      if (operator === "=") {
        this.data.filter[name] = value;
      } else {
        this.data.filter[name] = {
          value,
          operator,
        };
      }
      return this;
    }
    this.data.filter[name] = {
      condition: Object.assign(Object.assign({path, value}, operator !== "=" && {operator}), memberOf !== undefined && {memberOf}),
    };
    return this;
  }
  /**
   * @ignore
   */
  getIndexId(obj, proposedKey) {
    let key;
    if (obj[proposedKey] === undefined) {
      key = proposedKey;
    } else {
      key = Object.keys(obj).length.toString();
    }
    return key;
  }
  /**
   * Get query object.
   *
   * @category Helper
   */
  getQueryObject() {
    const foo = JSON.parse(JSON.stringify(this.data));
    if (!!this.data.include.length) {
      foo.include = this.data.include.join(",");
    }
    if (!!this.data.sort.length) {
      foo.sort = this.data.sort.join(",");
    }
    return foo;
  }
  /**
   * Get query string.
   *
   * @param options Options to be passed to `qs` library during parsing.
   *
   * @category Helper
   */
  getQueryString(options) {
    const data = this.getQueryObject();
    // NOTE: Empty objects are falsy in JavaScript.
    const qsOptions = options || this.getQsOption();
    return qs.stringify(data, qsOptions);
  }
  /**
   * Clear all parameters added so far.
   *
   * @category Helper
   */
  clear() {
    this.data = {
      filter: {},
      include: [],
      page: undefined,
      sort: [],
      fields: {},
    };
    return this;
  }
  /**
   * Initialize with a previously stored query object.
   *
   * @category Init
   */
  initializeWithQueryObject(input) {
    this.clear();
    const keys = Object.keys(input);
    keys.forEach(key => {
      switch (key) {
        case "sort":
          if (input.sort.length) {
            this.data.sort = input.sort.split(",");
          }
          break;
        case "include":
          if (input.include.length) {
            this.data.include = input.include.split(",");
          }
          break;
        default:
          this.data[key] = input[key];
      }
    });
    return this;
  }
  /**
   * Initialize with a previously stored query string.
   *
   * @param input The Query string to use for initializing.
   * @param options Options to be passed to `qs` library during parsing.
   *
   * @category Init
   */
  initializeWithQueryString(input, options) {
    this.clear();
    // NOTE: Empty objects are falsy in JavaScript.
    const qsOptions = options || this.getQsOption();
    this.initializeWithQueryObject(qs.parse(input, qsOptions));
    return this;
  }
  /**
   * Clone a given DrupalJsonApiParam object.
   *
   * @category Helper
   */
  clone(input) {
    const data = JSON.parse(JSON.stringify(input.getQueryObject()));
    this.initializeWithQueryObject(data);
    return this;
  }
  /**
   * Set options that is passed to qs when parsing/serializing.
   *
   * @see https://www.npmjs.com/package/qs
   */
  setQsOption(options) {
    this.qsOptions = options;
    return this;
  }
  /**
   * Get options that is passed to qs when parsing/serializing.
   *
   * @see https://www.npmjs.com/package/qs
   */
  getQsOption() {
    return this.qsOptions;
  }
  /**
   * Initialize with a previously stored query/object/query string.
   *
   * @category Init
   */
  initialize(input) {
    if (input === undefined) {
      this.initializeWithQueryString("");
    } else if (typeof input === "object") {
      try {
        // if the input has getQueryObject() we attempt to clone.
        input.getQueryObject();
        this.clone(input);
      } catch (error) {
        // In any case if cloning failed, we attempt to initialize
        // with query object.
        this.initializeWithQueryObject(input);
      }
    } else {
      this.initializeWithQueryString(input);
    }
    return this;
  }
}
exports.JsonApiParams = JsonApiParams;
