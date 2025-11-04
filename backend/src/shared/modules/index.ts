import { AuthenticationModule } from 'src/modules/auth/auth.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { ProductModule } from 'src/modules/product/product.module';
import { UserModule } from 'src/modules/user/user.module';

export const AllModules = [
  UserModule,
  AuthenticationModule,
  ProductModule,
  CategoryModule,
];
