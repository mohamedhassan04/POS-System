import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { configService } from './config/config.service';
import { AllModules } from './shared/modules';
import { GqlThrottlerGuard } from './config/GqlThrottlerGuard ';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
      envFilePath: '.env', // Specify the .env file path
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: {
        settings: {
          'request.credentials': 'include', // This setting is key for sending cookies
        },
      },
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ThrottlerModule.forRoot(configService.getThrottlerConfig()),
    ...AllModules,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
