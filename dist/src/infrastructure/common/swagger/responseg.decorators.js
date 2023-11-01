"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponsegType = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_interceptor_1 = require("../../common/interceptors/response.interceptor");
const ApiResponsegType = (model, isArray) => {
    return common_1.applyDecorators(swagger_1.ApiOkResponse({
        isArray: isArray,
        schema: {
            allOf: [
                { $ref: swagger_1.getSchemaPath(response_interceptor_1.ResponseFormat) },
                {
                    properties: {
                        data: {
                            $ref: swagger_1.getSchemaPath(model),
                        },
                        isArray: {
                            type: 'boolean',
                            default: isArray,
                        },
                    },
                },
            ],
        },
    }));
};
exports.ApiResponsegType = ApiResponsegType;
//# sourceMappingURL=responseg.decorators.js.map