export class CreateOutletDto {
  outlet_code: string;
  outlet_name: string;
}

export class UpdateOutletDto {
  outlet_code?: string;
  outlet_name?: string;
}