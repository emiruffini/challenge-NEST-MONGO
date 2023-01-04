import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  readonly name: string;

  @ApiProperty({ example: 'Doe' })
  readonly lastName: string;

  @ApiProperty({ example: 'Lima 823, Córdoba, Argentina' })
  readonly address: string;

  _id: string;
}
