import { AuthenticationModule } from 'src/modules/auth/auth.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { ProductModule } from 'src/modules/product/product.module';
import { TableModule } from 'src/modules/table/table.module';
import { UserModule } from 'src/modules/user/user.module';

export const AllModules = [
  UserModule,
  AuthenticationModule,
  ProductModule,
  CategoryModule,
  OrdersModule,
  TableModule,
];
