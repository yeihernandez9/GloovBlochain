"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const exception_filter_1 = require("./infrastructure/common/filter/exception.filter");
const logger_interceptor_1 = require("./infrastructure/common/interceptors/logger.interceptor");
const response_interceptor_1 = require("./infrastructure/common/interceptors/response.interceptor");
const logger_service_1 = require("./infrastructure/logger/logger.service");
async function bootstrap() {
    const env = process.env.NODE_ENV;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.useGlobalFilters(new exception_filter_1.AllExceptionFilter(new logger_service_1.LoggerService()));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new logger_interceptor_1.LoggingInterceptor(new logger_service_1.LoggerService()));
    app.setGlobalPrefix('api');
    if (env !== 'production') {
        const config = new swagger_1.DocumentBuilder()
            .addBearerAuth()
            .setTitle('API REST GLOOV BLOCKCHAIN')
            .setDescription('List Endpoin')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config, {
            extraModels: [response_interceptor_1.ResponseFormat],
            deepScanRoutes: true,
        });
        swagger_1.SwaggerModule.setup('api', app, document);
    }
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map