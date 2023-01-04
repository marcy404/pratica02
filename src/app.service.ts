import { PokeObject } from './interfaces/pokeObject.interface';
import { Injectable } from '@nestjs/common';
const { Client } = require('pg')
const client = new Client({
  host: 'localhost',
  port: 5431,
  user: 'postgres',
  password: 'Pokemon10',
  database: 'pokemon_practice'
});

(async () => {
  await client.connect()
})()

@Injectable()
export class AppService {
  async getAllPokemon() : Promise<any> {
    const result : PokeObject[] = (await client.query('SELECT * FROM pokemon_data')).rows;

    return result
  }

  async getPokemonById(id : number) : Promise<PokeObject> {
    const result : PokeObject = (await client.query({
      rowMode: 'array',
      text: 'SELECT * FROM pokemon_data WHERE id = $1'
    }, [id])).rows[0]

    return result
  }

  async postNewPokemon(inputJson : PokeObject) : Promise<string> {
    try {
      let values = [inputJson.id, inputJson.pokemon_name, inputJson.pokemon_type, inputJson.first_generation]
      await client.query('INSERT INTO pokemon_data VALUES ($1, $2, $3, $4)', values);

      return `Pokemon {${inputJson.pokemon_name}} successfully added!`
    } catch {
      return 'ERROR Trying to add your pokemon... check your inputs'
    }
  }

  
}
