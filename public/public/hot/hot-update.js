exports.id = "server";
exports.modules = {

/***/ "./shared/util.js":
/*!************************!*\
  !*** ./shared/util.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const config = __webpack_require__(/*! ../config */ \"./config/index.js\");\n\nconst utils = {\n    parseErrors: function parseErrors(errObj) {\n        const result = [];\n        if (errObj && errObj.errors) {\n            errObj.errors.map(function(_ref) {\n                const message = _ref.message,\n                    path = _ref.path;\n\n                result.push({ message: message, path: path });\n            });\n        }\n        return result;\n    },\n\n    plural: {\n        post: \"posts\",\n        page: \"pages\"\n    },\n\n    makeUrl: function makeUrl(parts) {\n        if (typeof parts === \"string\") {\n            parts = [parts];\n        }\n        const url = config.rootUrl + \"/\" + parts.join(\"/\");\n        return url.replace(/\\/\\/+/g, \"/\").replace(\":/\", \"://\");\n    },\n\n    recurseMenu: function(item, postId, cb) {\n        if (item.children && item.children.length > 0) {\n            item.children = item.children.map(childItem =>\n                utils.recurseMenu(childItem, postId, cb)\n            );\n        }\n        if (item.id == postId) {\n            // the slug of this page should change.\n            item = cb(item);\n        }\n        return item;\n    },\n\n    getTagsAndCategories: function(taxonomies) {\n        let data = { categories: [], tags: [] };\n        taxonomies.forEach(taxonomy => {\n            if (taxonomy.type === \"post_category\") {\n                data.categories.push(taxonomy);\n            } else {\n                data.tags.push(taxonomy);\n            }\n        });\n        return data;\n    }\n};\nmodule.exports = utils;\n\n\n//# sourceURL=webpack://server/./shared/util.js?");

/***/ })

};