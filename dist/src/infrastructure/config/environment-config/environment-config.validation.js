"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Production"] = "production";
    Environment["Local"] = "local";
    Environment["Test"] = "test";
})(Environment || (Environment = {}));
class EnvironmentVariables {
}
__decorate([
    class_validator_1.IsEnum(Environment),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_SECRET", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_EXPIRATION_TIME", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_REFRESH_TOKEN_SECRET", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_REFRESH_TOKEN_EXPIRATION_TIME", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DATABASE_HOST", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "DATABASE_PORT", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DATABASE_USER", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DATABASE_PASSWORD", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DATABASE_NAME", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DATABASE_SCHEMA", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "DATABASE_SYNCHRONIZE", void 0);
function validate(config) {
    const validatedConfig = class_transformer_1.plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = class_validator_1.validateSync(validatedConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
exports.validate = validate;
//# sourceMappingURL=environment-config.validation.js.map