import { IMeta } from "Base/Model/IMeta";
import { IProp } from "Base/Model/IProp";
import BooleanInput from "Base/PropsInputs/BooleanInput";
import StringInput from "Base/PropsInputs/StringInput";
import colorRule from "Base/Rules/colorRule";
import itemsRule from "Base/Rules/itemsRule";
import { Rule } from "Base/Rules/Rule";
import sizeRule from "Base/Rules/sizeRule";

export class RadioGroupRule extends Rule{
  //editPaddingY = '';
  //editPaddingX = '';
  //empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      {
        name:'label',
        label:'label',
        input:StringInput,
      },
      colorRule,
      sizeRule,
      {
        name:'row',
        label:'row-show',
        input:BooleanInput,
      },
      {
        name:'helperText',
        label:'helper-text',
        xs:12,
        input:StringInput,
      },
      itemsRule
    ]
  }

}