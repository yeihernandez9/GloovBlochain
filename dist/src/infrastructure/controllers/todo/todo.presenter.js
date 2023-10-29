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
exports.TodoPresenter = void 0;
const swagger_1 = require("@nestjs/swagger");
class TodoPresenter {
    constructor(todo) {
        this.id = todo.id;
        this.content = todo.content;
        this.isDone = todo.isDone;
        this.createdate = todo.createdDate;
        this.updateddate = todo.updatedDate;
    }
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], TodoPresenter.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], TodoPresenter.prototype, "content", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], TodoPresenter.prototype, "isDone", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], TodoPresenter.prototype, "createdate", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], TodoPresenter.prototype, "updateddate", void 0);
exports.TodoPresenter = TodoPresenter;
//# sourceMappingURL=todo.presenter.js.map