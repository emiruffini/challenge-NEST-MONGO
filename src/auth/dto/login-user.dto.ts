import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: '9836ec29-3bfb-4a1b-98e5-1ad86cc4e962' })
  readonly id: string;
}
