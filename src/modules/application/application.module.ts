import { Module } from '@nestjs/common';
import { DataModule } from "../data/data.module";

@Module({
    modules: [DataModule],
})
export class ApplicationModule {}