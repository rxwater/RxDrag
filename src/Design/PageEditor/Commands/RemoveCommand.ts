import { RelationCommand } from "./RelationCommand";

export class MoveInTopCommand extends RelationCommand{
  excute(){
    this.draggedNode.remove();
    return undefined;
  }
}