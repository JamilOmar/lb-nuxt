import {DefaultCrudRepository} from '@loopback/repository';
import {Item, ItemRelations} from '../models';
import {TraxtiDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id,
  ItemRelations
> {
  constructor(
    @inject('datasources.TraxtiDS') dataSource: TraxtiDsDataSource,
  ) {
    super(Item, dataSource);
  }
}
