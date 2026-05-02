import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // Priority check for the specific admin credentials provided by the user
    if (email === 'admin@myladoor.com' && pass === 'Myladoor@Admin2026.') {
      let admin = await this.userService.findOne(email);
      if (!admin) {
        // Create the admin if it doesn't exist yet
        const hashedPassword = await bcrypt.hash(pass, 10);
        admin = await this.userService.create({
          email,
          password: hashedPassword,
          name: 'Saji Myladoor',
          role: 'ADMIN',
          phone: '8848392990'
        });
      }
      const { password, ...result } = admin;
      return result;
    }

    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(name: string, email: string, phone: string, pass: string) {
    console.log('Registration request received:', { email, name, phone });
    const existingUser = await this.userService.findOne(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.userService.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: email === 'admin@myladoor.com' ? 'ADMIN' : 'USER'
    });

    const { password, ...result } = user;
    return result;
  }
}
