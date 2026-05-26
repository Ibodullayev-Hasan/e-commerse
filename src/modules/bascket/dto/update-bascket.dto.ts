import { PartialType } from '@nestjs/mapped-types';
import { CreateBascketDto } from './create-bascket.dto';

export class UpdateBascketDto extends PartialType(CreateBascketDto) {}
