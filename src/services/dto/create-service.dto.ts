import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateServiceDto {
    /**
     * @example 'Corte de cabello'
     * @description Nombre del servicio
     */
    @IsString()
    @IsNotEmpty()

    readonly name: string
    /**
     * @example '12.000'
     * @description Precio del servicio
     */

    @IsNumber()
    @IsNotEmpty()
    readonly price: number
}
