import { idInput } from './interfaces/inputs.interface';
import { Body, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PokeObject } from './interfaces/pokeObject.interface';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/all-pokemon')
  async inputAllPokemon() : Promise<PokeObject[]> {
    return await this.appService.getAllPokemon()
  }

  @Get('/one-pokemon')
  async inputOnePokemon(@Body() inputJson : idInput) : Promise<PokeObject>{
    return await this.appService.getPokemonById(inputJson.id)
  }

  @Get('/pokemon-name/:id')
  async inputIdPokemon(@Param('id') id : number) : Promise<PokeObject> {
    return await this.appService.getPokemonById(id)
  }

  @Post('/create-pokemon')
  async inputPokemonData(@Body() inputJson : PokeObject) : Promise<string> {
    return await this.appService.postNewPokemon(inputJson)
  }

  
}
