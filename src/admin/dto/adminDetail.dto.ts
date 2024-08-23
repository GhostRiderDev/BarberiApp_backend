export class AdminDetailDto {
  /**
   * @example 'f7b3f3b3-7f7b-4b1e-8f7b-3b7f7b4b1e8f'
   * @description Identificador del administrador
   */
  readonly id: string;

  /**
   * @example 'Juan'
   * @description Nombre del administrador
   */
  readonly name: string;

  /**
   * @example 'mail@gmail.com'
   * @description Correo electrónico del administrador
   */
  readonly email: string;
}
