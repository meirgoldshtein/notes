import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, NotesModule, AuthModule],

})
export class AppModule {}
