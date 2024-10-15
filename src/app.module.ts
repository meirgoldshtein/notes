import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    NotesModule,
    AuthModule],

})
export class AppModule { }
