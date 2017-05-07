import { Module } from 'nest.js';
import {HealthCheckController} from "./healthcheck.controller";

@Module({
    components: [],
    controllers: [HealthCheckController],
    modules: []
})
export class HealthCheckModule {}