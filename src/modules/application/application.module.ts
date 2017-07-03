import { Module } from '@nestjs/common';
import { DataModule } from "../data/data.module";
import { UsersModule } from "../users/user.module";

@Module({
    modules: [DataModule, UsersModule],
})
export class ApplicationModule {}